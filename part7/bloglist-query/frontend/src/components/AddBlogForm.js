
import { useQueryClient, useMutation } from 'react-query'
import { createBlog } from '../request'
import { useNotificationDispatch } from '../notificationContext'


const AddBlogForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
    },
    onError: () => {
      dispatch({ type: 'showNotification', payload: 'fail to create the blog' })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  })

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    newBlogMutation.mutate({ title, author, url })
    console.log('new blog')

    await dispatch({ type: 'showNotification', payload: `You added ${title} by ${author} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            type="text"
            name="title"
            placeholder='write title here'
          />
        </div>
        <div>
            author:
          <input
            type="text"
            name="author"
            placeholder='write author here'
          />
        </div>
        <div>
            url:
          <input
            type="url"
            name="url"
            placeholder='write url here'
          />
        </div>
        <button type="submit" id='create-button'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm