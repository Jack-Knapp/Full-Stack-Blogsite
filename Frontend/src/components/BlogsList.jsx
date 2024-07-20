import { useRef } from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { Stack } from '@mantine/core'

const BlogsList = () => {
    const blogFormRef = useRef()
    const blogs = useSelector(state => state.blogs)
    const currUser = useSelector(state => state.currentUser)
    
      if (!currUser.username) {
        return ""
      }
  
      return (
        <Stack ml="xl" mr="xl">
          <h2>Blogs</h2>
          <Togglable buttonLabel="Add Blog" ref={blogFormRef}> 
            <BlogForm instanceRef = {blogFormRef}/>
          </Togglable>
  
          {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
        </Stack>  
      )
}

export default BlogsList