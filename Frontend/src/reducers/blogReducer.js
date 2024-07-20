import blogService from '../services/blogs'
import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    replaceBlog(state, action) {
      const id =action.payload.id
      const changedBlog = action.payload
      return state.map(blog => blog.id === id ? changedBlog : blog).sort((a,b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const {appendBlog, replaceBlog, removeBlog, setBlogs} = blogSlice.actions

export const initBlogs = () => {
  return async dispatch => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs.sort((a,b) => b.likes - a.likes)))
    )  
  }
}

export const addBlog = (object) => {
  return async dispatch => {
    blogService.create(object).then(blog =>
      dispatch(appendBlog(blog))  
    )
  }
}

export const upvoteBlog = (object) => {
  return async dispatch => {
    const newBlog = {
      ...object,
      likes: object.likes + 1
    }

    console.log(`in the reducer`)
    console.log(newBlog)

    blogService.update(newBlog).then(() => 
      dispatch(replaceBlog(newBlog)))
  }
}

export const commentOnBlog = (object, comment) => {
  return async dispatch => {
    const newBlog = {
      ...object,
      comments: [...object.comments, comment]
    }

    console.log(newBlog)

    blogService.addComment(newBlog).then(() => 
      dispatch(replaceBlog(newBlog)))
  }
}

export const deleteBlog = (object) => {
  return async dispatch => {
    blogService.remove(object).then(() =>
      dispatch(removeBlog(object))  
    )
  }
}

export default blogSlice.reducer