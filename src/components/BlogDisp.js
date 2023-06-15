import Togglable from './Togglable';
import Likes from './Likes';
import Delete from './Delete';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel='view'>
      {blog.url} <br />
      likes:
      <Likes target={blog.id} blog={blog}/>
      <br />
      {blog.user.name} <br />
      <Delete target={blog.id} blog={blog}/>
    </Togglable>
  </div>
  )
};

export default Blog;
