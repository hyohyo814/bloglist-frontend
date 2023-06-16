import Togglable from './Togglable';
import Likes from './Likes';

const BlogDetails = ({ blog }) => (
  <Togglable buttonLabel="view">
    <div className='urldisplay'>{blog.url}</div><br />
    <div className='likesdisplay'>
    likes:
    <Likes
      target={blog.id}
      blog={blog}
    />
    </div>
    <br />
    {blog.user.name} <br />
  </Togglable>
)

export default BlogDetails;
