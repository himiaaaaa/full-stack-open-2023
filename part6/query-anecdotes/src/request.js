import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createAnecdote = newAnecdote => 
    axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateVote = updateAnecdote => {
    axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(res => res.data)
  } 