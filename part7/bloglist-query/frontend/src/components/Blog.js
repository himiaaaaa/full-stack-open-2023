import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../notificationContext'
import { updateLike,deleteBlog } from '../request'
import { useUserValue } from '../userContext'

const Blog = (({ blog }) => {
  const queryClient = useQueryClient()

  const user = useUserValue()

  const dispatch = useNotificationDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLikeMutation = useMutation(updateLike, {
    onSuccess: (updatedLike) => {
      console.log('update', updatedLike)

      const blogs = queryClient.getQueryData('blogs')

      queryClient.setQueryData('blogs', blogs.map(blog =>
        blog.id === updatedLike.id ? updatedLike : blog
      ))
    }
  })

  const handleLike = async (blog) => {
    addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })

    await dispatch({ type: 'showNotification', payload: `You add one like for: ${blog.title} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  const deleteMutation = useMutation(deleteBlog, {
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData('blogs')

      queryClient.setQueryData('blogs', blogs.filter(blog =>
        blog.id !== deletedBlog.id
      ))
    }
  })

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteMutation.mutate(blog)
    }
    await dispatch({ type: 'showNotification', payload: `You deleted: ${blog.title} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  const showDelete = blog.user.username === user.username ? true : false
  console.log('blog', blog)
  console.log('user', user)

  return (
    <div style={blogStyle}  className='blog'>
      <div style={hideWhenVisible} className='whenHidden'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='whenShown'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => handleLike(blog)}>likes</button>
        </p>
        <p>{blog.user!== null && blog.user.name}</p>
        {showDelete && <button onClick={() => handleDelete(blog)} id='remove-button'>remove</button>}
      </div>
    </div>
  )})

export default Blog