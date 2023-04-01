
const AddBlogForm = ({ 
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    handleLikesChange,
    title,
    author,
    url,
    likes
 }) => {
 
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title: 
              <input 
              type="text"
              value={title}
              name="Title"
              onChange={handleTitleChange}
              />
          </div>
          <div>
            author: 
              <input 
              type="text"
              value={author}
              name="Author"
              onChange={handleAuthorChange}
              />
          </div>
          <div>
            url: 
              <input 
              type="url"
              value={url}
              name="url"
              onChange={handleUrlChange}
              />
          </div>
          <div>
            likes: 
              <input 
              type="likes"
              value={likes}
              name="likes"
              onChange={handleLikesChange}
              />
          </div>
          <button type="submit">create</button>
        </form>
     </div> 
    )
}

export default AddBlogForm