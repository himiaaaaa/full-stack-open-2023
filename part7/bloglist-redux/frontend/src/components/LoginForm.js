import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import Notification from './Notification'
import { initializeBlogs } from '../reducers/blogReducer'

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
        <div>
            username
          <input
            type="text"
            name="Username"
            id="username"
          />
        </div>
        <div>
            password
          <input
            type="password"
            name="Password"
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
            login
        </button>
      </form>
    </div>
  )
}

export default LoginForm