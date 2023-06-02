import { useSelector } from 'react-redux'
import Blog from './BlogDisplay'

const BlogList = ( ) => {
  const blogs = useSelector(state => {
    return state.blogs.slice().sort((a,b) => b.likes - a.likes)
  })

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList