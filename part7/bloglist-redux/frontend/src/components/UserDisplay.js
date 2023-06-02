import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserDisplay = () => {
  const displayUsers = useSelector(state => state.users)

  console.log('display', displayUsers)

  return (
    <div>
      <h2>Users</h2>
      <Table striped >
        <tbody>
          <tr>
            <td>{ }</td>
            <td><h5>blogs created</h5></td>
          </tr>
          {displayUsers.map(displayUser =>
            <tr key={displayUser.id}>
              <td>
                <Link to={`/users/${displayUser.id}`}>{displayUser.username}</Link>
              </td>
              <td>
                {displayUser.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserDisplay