import { useState} from 'react'
import { useDispatch} from 'react-redux'
import { upvoteBlog, deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

import { Button, Box } from '@mantine/core'


const Blog = ({blog}) => {
  const [view, setView] = useState(false)
  const showonView = { display: view ? '' : 'none' }
  const label = view ? 'hide' : 'view'

  const dispatch = useDispatch()

  const blogStyle = {
    backgroundColor: 'whitesmoke',
    paddingTop: 5,
    paddingLeft: 12,
    paddingBottom: 5,
    border: 'dashed',
    borderWidth: 1,
    borderRadius: '8px',
    marginBottom: 0
  }

  const toggleView = (event) => {
    setView(!view)
  }

  const onLike = (blog) => {
    console.log("Putting...Puttaroo")
    console.log(blog)
    dispatch(upvoteBlog(blog))
    dispatch(notify(`${blog.title} by ${blog.author} has been updated!`)) 
  }

  const onDelete = (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      console.log("Deleting...deletaroo")
      console.log(blog)
      dispatch(deleteBlog(blog))
      dispatch(notify(`${blog.title} by ${blog.author} has been deleted!`)) 
    }
  }

  const deleteButton = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const userS = JSON.parse(loggedUser)
      if (userS.username === blog.user.username)
      return (
        <div style={showonView}>
          <Button mt="xs" mb="xs" onClick = {() => onDelete(blog)}>remove</Button>
        </div>
      )

    }
    
    return (
     <div></div>
    )
  }

  return (
    <Box>
      <div style={blogStyle}>
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link> 
          <Button  mt="xs" mb="xs" ml="xs" onClick={toggleView}>{label}</Button>
        </div>
        <div style={showonView}>{blog.url}</div>
        <div style={showonView}>
          Likes: {blog.likes} <Button mt="xs" mb="xs" onClick = {() => onLike(blog)}>like</Button>
        </div>
        <div style={showonView}>{blog.user.name}</div>
        {deleteButton()}
      </div> 
    </Box>
  )
}
   

export default Blog
