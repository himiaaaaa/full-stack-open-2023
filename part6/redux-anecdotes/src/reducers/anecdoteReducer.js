import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

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
    createAnecdotes(state, action) {
      const newAnecdote = action.payload
      console.log("newAnecdote", newAnecdote)
      state.push({        
        content: newAnecdote, 
        id: getId(),
        votes: 0   
      })
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdote(state, action){
      return action.payload
    }
  }
})

export const { addVotes, createAnecdotes,appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer 
