import { useDispatch } from "react-redux"
import { createAnecdotes } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotesInput.value
        event.target.anecdotesInput.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdotes(newAnecdote.content))
        dispatch(showNotification(`You added "${content}"!`))
        setTimeout(()=> {
            dispatch(showNotification(''))
        }, 5000) 
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdotesInput' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm