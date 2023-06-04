import { useDispatch } from 'react-redux'
import { createComments } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const AddCommentForm = ( { id } ) => {
  const dispatch = useDispatch()

  const addComment = async (event) => {

    event.preventDefault()

    const newComment = event.target.commentInput.value

    event.target.commentInput.value = ''

    console.log('newcomment', newComment)

    dispatch(createComments(id, newComment))
    dispatch(setNotification(`a new comment ${newComment} added`, 5))
  }

  return (
    <div>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control name="commentInput" />
        </Form.Group>
        <Button type="submit" variant='primary'>
          add comment
        </Button>
      </Form>
    </div>
  )
}

export default AddCommentForm