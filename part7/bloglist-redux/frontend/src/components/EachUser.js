import { useSelector } from 'react-redux'
import {
  useParams,
} from 'react-router-dom'

const EachUser = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  console.log('id', id)
  const user = users.find(n => n.id === String(id))

  if(!user){
    return null
  }

  console.log('individual user', user)

  return(
    <div>
      <h2>{user.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id} >{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default EachUser