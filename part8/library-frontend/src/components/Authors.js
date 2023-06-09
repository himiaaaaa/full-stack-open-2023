import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({show, authors, setError}) => {
  const[name, setName] = useState('')
  const[born, setBorn] = useState('')

  const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries:[{ query: ALL_AUTHORS }],
  })
  
  const submit = (event) => {
    event.preventDefault()

    changeAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if(result.data && result.data.editAuthor === null){
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line 
 
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label>
          ---- Select a author to update the birthday ----
          <br />
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(a => 
              <option value={a.name} key={a.name}>
                {a.name}
              </option>
            )}
          </select>
        </label>
        <div>
          born
          <input 
            value={born}
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
