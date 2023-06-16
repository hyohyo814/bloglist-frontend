import BlogDisp from './BlogDisp';

const _ = require('lodash');

const BlogList = ({ blogs }) => {
  const testBlogs = _.orderBy(blogs, ['likes'], ['desc']);
  console.log('blogList function');

  const blogsList = _.map(testBlogs, (blog) => (
    <BlogDisp
      key={blog.id}
      blog={blog}
    />
  ));
  // console.log(blogsList)
  return blogsList;
};

export default BlogList;
