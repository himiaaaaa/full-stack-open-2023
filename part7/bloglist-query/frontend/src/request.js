import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const updateLike = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

export const deleteBlog = async (deletedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${deletedBlog.id}`, config)

  return response.data
}

export const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

