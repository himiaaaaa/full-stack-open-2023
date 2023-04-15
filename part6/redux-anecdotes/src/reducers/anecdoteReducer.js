import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      const id = action.payload.id
      console.log('id', id)
      const changedAnecdote = action.payload

      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }, 
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdote(state, action){
      return action.payload
    },
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

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

export const addVotes = id => {
  return async dispatch => {
    const newVote = await anecdoteService.updateVote(id)
    dispatch(voteAnecdote(newVote))
  }
}

export default anecdoteSlice.reducer 
