import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import DispSelector from './components/DispSelector'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import './index.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [dispatch])

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <DispSelector />
      <BlogList />
    </div>
  )
}

export default App
