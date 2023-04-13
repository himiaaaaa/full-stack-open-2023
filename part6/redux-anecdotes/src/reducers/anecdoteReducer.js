import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

//const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVotes(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id ===id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    /* createAnecdotes(state, action) {
      const newAnecdote = action.payload
      console.log("newAnecdote", newAnecdote)
      state.push({        
        content: newAnecdote, 
        id: getId(),
        votes: 0   
      })
    }, */
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdote(state, action){
      return action.payload
    }
  }
})

export const { addVotes, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAncedotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer 
