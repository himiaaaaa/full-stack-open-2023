import { useState } from 'react'

const Blog = (({blog, addLikes, deleteBlog}) => {
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
  
    const handleLike = () => {
      const blogObject = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
      }
      addLikes(blog.id, blogObject)
    }

    const handleDelete = () => {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        deleteBlog(blog.id)  
      }
     
    }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLike}>likes</button>
        </p>
        <p>{blog.user!== null && blog.user.name}</p>
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
)})

export default Blog