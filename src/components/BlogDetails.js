import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { updLikes } from '../reducers/blogReducer'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLikes = async (event) => {
    event.preventDefault()

    const newBlogObj = {
      ...blog,
      likes: blog.likes + 1,
    }

    dispatch(updLikes(newBlogObj, blog.id))
  }

  return (
    <Togglable buttonLabel="view">
      <div className="urldisplay">{blog.url}</div>
      <div className="likesdisplay">
        likes: {blog.likes}
        <button onClick={handleLikes} placeholder={'likebtn'}>like</button>
      </div>
      {blog.user.name} <br />
    </Togglable>
  )
}

export default BlogDetails
