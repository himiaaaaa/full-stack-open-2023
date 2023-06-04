import { useSelector } from 'react-redux'
import AddCommentForm from './AddCommentForm'

const BlogComment = ({ id }) => {
  const comments = useSelector(state => state.comments)
  console.log('comment', comments)

  return(
    <div>
      <h3>comments</h3>
      <AddCommentForm id={id}/>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </div>
  )
}

export default BlogComment