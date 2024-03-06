const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="Author"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input type="url" name="Url" value={url} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
