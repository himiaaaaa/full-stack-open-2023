const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        const foundAuthor = await Author.findOne({ name: args.author })
  
        if(args.author && args.genres){
          return await Book.find( {author: foundAuthor.id , genres:{ $in: args.genres }} ).populate('author')
        }
        else if(args.author){
          return await Book.find({ author: foundAuthor.id }).populate('author')
        }
        else if(args.genres){
          return await Book.find({ genres:{ $in: args.genres }}).populate('author')
        }else{
          return await Book.find({}).populate('author')
        } 
      },
      allAuthors: async () => {
        console.log('Author.find')
        return Author.find({}).populate('books')
      },
      me: async (root, args, context) => {
        return context.currentUser
      }
    },
     Author: {
     bookCount: async(root) => {
      const foundAuthor = await Author.findOne({ name: root.name })
      const foundBooks = await Book.find({ author : foundAuthor.id })
      console.log("book.find")
      return foundBooks.length 
      //return await root.books.length
     }
    }, 
    Mutation: {
      addBook: async (root, args, context) => {
  
         const existAuthor = await Author.findOne({ name: args.author })
         const currentUser = context.currentUser
  
         if(!currentUser){
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
         }
  
         if(!existAuthor){
            const newAuthor = new Author({ name: args.author, })
            try{
              await newAuthor.save()
            } catch (error) {
              throw new GraphQLError('saving author failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args,
                  error
                }
              })
            }
         }
          const foundAuthor = await Author.findOne({ name: args.author })
          const book = new Book({ 
            ...args, 
            author: foundAuthor,
           })
          try{
            await book.save()
         
            foundAuthor.books = foundAuthor.books.concat(book.id)
            await foundAuthor.save()

            const newBook = await Book.findById(book.id).populate('author')

            //return book
          } catch (error) {
            throw new GraphQLError('saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
        } 
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return book
      },
      editAuthor: async (root, args, context) => {
  
        const author = await Author.findOne({ name: args.name })
        const currentUser = context.currentUser
  
         if(!currentUser){
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
         }
  
        if(!author){
          return null
        }else{
        author.born = args.born
        try{
           await author.save()
        } catch (error) {
          throw new GraphQLError('saving born failed',{
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
        }
      },
      createUser: async (root, args) => {
        const user = new User({ 
          username: args.username,
          favoriteGenre: args.favoriteGenre
         })
  
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if( !user || args.password != 'numberone' ){
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

  module.exports = resolvers