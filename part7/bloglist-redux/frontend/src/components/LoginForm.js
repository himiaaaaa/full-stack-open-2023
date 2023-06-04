import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import Notification from './Notification'
import { initializeBlogs } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(initializeBlogs())
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            id="username"
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            id="password"
          />
          <Button type="submit" variant='primary'>
            login
          </Button>
        </Form.Group>
      </form>
    </div>
  )
}

export default LoginForm