import BlogBasic from './BlogBasic';
import BlogDetails from './BlogDetails';

const BlogDisp = ({ blog, handleLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <BlogBasic blog={blog} />
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDisp;
