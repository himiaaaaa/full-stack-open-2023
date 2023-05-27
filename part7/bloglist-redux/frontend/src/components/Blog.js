import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLikes } from '../reducers/blogReducer'
import { deleteBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const authUser = useSelector(state => state.authUser)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    dispatch(addLikes(blog))
    dispatch(setNotification(`You added one like for "${blog.title}" !`, 5))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogs(blog.id))
      dispatch(setNotification(`You deleted "${blog.title}" !`, 5))
    }
  }

  const showDelete = blog.user.username === authUser.username ? true : false

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="whenHidden">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="whenShown">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLike}>likes</button>
        </p>
        <p>{blog.user !== null && blog.user.name}</p>
        {showDelete && <button onClick={handleDelete} id="remove-button">
            remove
        </button>}
      </div>
    </div>
  )
}

export default Blog
