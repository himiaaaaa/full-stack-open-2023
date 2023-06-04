import { useDispatch } from 'react-redux'
import { createBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const addBlog = async (event) => {

    event.preventDefault()

    const title = event.target.titleInput.value
    const author = event.target.authorInput.value
    const url = event.target.urlInput.value

    event.target.titleInput.value = ''
    event.target.authorInput.value = ''
    event.target.urlInput.value = ''

    const createdBlog = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlogs(createdBlog))
    dispatch(setNotification(`a new blog ${title} by ${author} added`, 5))
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control name="titleInput"/>
          <Form.Label>Author:</Form.Label>
          <Form.Control name="authorInput"/>
          <Form.Label>Url:</Form.Label>
          <Form.Control name="urlInput"/>
          <Button type="submit" variant="primary">
              create
          </Button>
        </Form.Group>
      </Form>
    </Togglable>
  )
}

export default AddBlogForm
