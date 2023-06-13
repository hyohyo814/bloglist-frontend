const BlogCreate = ({
  user,
  logout,
  handle,
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl,
}) => (
  <>
    <div>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  <form onSubmit={handle}>
      <h2>create new</h2>
      <div>
      title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitle}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Title"
          onChange={handleAuthor}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrl}
        />
      </div>
      <button type='submit'>create</button>
    </form>
    </>
);

export default BlogCreate;
