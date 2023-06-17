import BlogDisp from './BlogDisp';
import Delete from './Delete';

const _ = require('lodash');

const BlogList = ({ blogs }) => {
  const testBlogs = _.orderBy(blogs, ['likes'], ['desc']);
  console.log('blogList function');

  const blogsList = _.map(testBlogs, (blog) => (
    <div key={blog.id}>
      <BlogDisp
        blog={blog}
      />
      <Delete
        blog={blog}
      />
    </div>
  ));
  // console.log(blogsList)
  return blogsList;
};

export default BlogList;
