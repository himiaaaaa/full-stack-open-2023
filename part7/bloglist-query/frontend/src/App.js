import { useEffect, useRef, useContext } from 'react'
import { useQuery } from 'react-query'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './notificationContext'
import UserContext from './userContext'
import { getBlogs, setToken } from './request'

const App = () => {

  const [user, userDispatch] = useContext(UserContext)

  const dispatch = useNotificationDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'setUser', payload: user })
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setToken(user.token)
      userDispatch({ type: 'setUser', payload: user })
    } catch (exception) {
      dispatch({ type: 'showNotification', payload: 'Wrong username or password' })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    userDispatch({ type: 'clearUser' })
  }


  const result = useQuery(
    'blogs',
    getBlogs,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )
  console.log('1111', result)

  if( result.isLoading ){
    return <div>loading data...</div>
  }

  if( result.isError ){
    return<div>blog service not available due to problem in server</div>
  }

  const blogs = result.data

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="username"
              id='username'
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              id='password'
            />
          </div>
          <button type="submit" id='login-button'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p> {user.name} logged in </p>
      <button type="submit" onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <AddBlogForm />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </div>
  )
}

export default App