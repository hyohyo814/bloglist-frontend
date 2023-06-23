import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const _ = require('lodash')

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendPost(state, action) {
      state.push(action.payload)
    },
    setPosts(state, action) {
      return _.orderBy(action.payload, ['likes'], ['desc'])
    },
  },
})

export const { appendPost, setPosts } = blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setPosts(blogs))
  }
}

export const createPost = (content) => {
  return async (dispatch) => {
    const newPost = await blogService.create(content)
    dispatch(appendPost(newPost))
  }
}

export const removePost = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const upd = await blogService.getAll()
    dispatch(setPosts(upd))
  }
}

export const updLikes = (obj, id) => {
  return async (dispatch) => {
    await blogService.update(obj, id)
    const upd = await blogService.getAll()
    dispatch(setPosts(upd))
  }
}

export default blogSlice.reducer
