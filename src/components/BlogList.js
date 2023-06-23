import BlogDisp from './BlogDisp'
import Delete from './Delete'
import { useSelector, useDispatch } from 'react-redux'

const _ = require('lodash')

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  // const testBlogs = _.orderBy(blogs, ['likes'], ['desc'])
  console.log('blogList function')

  const blogsList = _.map(blogs, (blog, key) => (
    <div
      key={blog.id}
      id={`blog${key}`}>
      <BlogDisp
        blog={blog}
        index={key}
      />
      <Delete
        blog={blog}
        index={key}
      />
    </div>
  ))
  // console.log(blogsList)
  return blogsList
}

export default BlogList
