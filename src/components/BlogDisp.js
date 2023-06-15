import Togglable from './Togglable';
import Likes from './Likes';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const incLikes = target => {

  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel='view'>
      {blog.url} <br />
      likes:
      {blog.likes} 
      <Likes handle={incLikes} target={blog.id}/>
      <br />
      {blog.user.name} <br />
    </Togglable>
  </div>
  )
};

export default Blog;
