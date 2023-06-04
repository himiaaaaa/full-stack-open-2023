//import { useState } from 'react'
//import { useDispatch } from 'react-redux'
/* import { addLikes } from '../reducers/blogReducer'
import { deleteBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
 */

import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  //const dispatch = useDispatch()

  //const authUser = useSelector(state => state.authUser)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  /*   const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  } */

  /* const handleLike = () => {
    dispatch(addLikes(blog))
    dispatch(setNotification(`You added one like for "${blog.title}" !`, 5))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogs(blog.id))
      dispatch(setNotification(`You deleted "${blog.title}" !`, 5))
    }
  } */

  //const showDelete = blog.user.username === authUser.username ? true : false

  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
      {/* <div>
        {blog.title} {blog.author}
        <button>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLike}>likes</button>
        </p>
        <p>{blog.user !== null && blog.user.name}</p>
        <button onClick={handleDelete} id="remove-button">
            remove
        </button>
      </div> */}
    </div>
  )
}

export default Blog
