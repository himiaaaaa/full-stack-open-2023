import { useDispatch } from "react-redux"
import { createAnecdotes } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        console.log(event.target)
        const content = event.target.anecdotes.value
        event.target.anecdotes.value = ''
        dispatch(createAnecdotes(content))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div>
                <input name='anecdotes' />
            </div>
            <button type='submit'>create</button>
      </form>

        </div>
    )
}

export default AnecdoteForm