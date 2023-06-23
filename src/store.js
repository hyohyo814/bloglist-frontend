import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notification: notifReducer,
  }
})
