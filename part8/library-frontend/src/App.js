import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
query{
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
const ALL_BOOKS = gql`
query{
  allBooks {
    title
    published
    author
    id
    genres
  }
}`

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if(authors.loading || books.loading){
    return <div>loading...</div>
  }

  console.log('authors', authors.data.allAuthors)
  console.log('books', books.data.allBooks)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
