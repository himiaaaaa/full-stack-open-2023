const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const { GraphQLError } = require('graphql')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

 /*  const author = new Author({ name: 'Martin Fowler', born: 1963 });
  author.save();

 const books = new Book({
  title: 'Refactoring, edition 2',
  published: 2018,
  author: author._id,
  genres: ['refactoring']
  })

  books.save().then(result => {
    console.log('book saved!')
    mongoose.connection.close()
  }) 
 */


/*   let authors = [
    {
      name: 'Robert Martin',
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963
    },
    {
      name: 'Fyodor Dostoevsky',
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821
    },
    { 
      name: 'Joshua Kerievsky', // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    { 
      name: 'Sandi Metz', // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
  ]
  
  let books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'crime']
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
  ] */
  

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int
  }


  type Book {
    title: String!
    published: String!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published:String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: String!
    ): Author,
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
       if(args.author && args.genres){
        return Book.find( {author: args.author, genres:{ $in: args.genres}} ).populate('author')
      }
      else if(args.author){
        return Book.find({ author: args.author }).populate('author')
      }
      else if(args.genres){
        return Book.find({ genres:{ $in: args.genres }}).populate('author')
      }else{
        return Book.find({}).populate('author')
      } 
    },
    allAuthors: async () => {
      return Author.find({})
    },
  },
  Author: {
   bookCount: async(root) => {
    Book.find({author : root.name}).countDocuments({})
   }
  },
  Mutation: {
    addBook: async (root, args) => {
      /* const book = { ...args, id: uuid() }

      if(!authors.includes(book.author)){
        authors = authors.concat({ name: book.author, id: uuid()})
      }
       books = books.concat(book)
       return book */

       const existAuthor = await Author.findOne({ name: args.author })
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
          return book
        } catch (error) {
          throw new GraphQLError('saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
    }
      
    },
    editAuthor: async (root, args) => {
      /* const author = authors.find(a => a.name === args.name)
      if(!author){
        return null
      }else{
        const updatedauthor = { ...author, born: args.born }
        authors = authors.map(a => a.name === args.name? updatedauthor : a)
        return updatedauthor
      } */
      const author = await Author.findOne({ name: args.name })
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})