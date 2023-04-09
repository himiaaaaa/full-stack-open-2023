import { useSelector, useDispatch } from 'react-redux'
import { addVotes, createAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVotes(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log(event.target)
    const content = event.target.anecdotes.value
    event.target.anecdotes.value = ''
    dispatch(createAnecdotes(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdotes' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App