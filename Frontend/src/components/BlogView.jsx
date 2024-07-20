import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

import {notify} from '../reducers/notificationReducer'
import {commentOnBlog, initBlogs, upvoteBlog} from '../reducers/blogReducer'

import { Button, Group, TextInput, Flex, Box } from '@mantine/core'

const BlogView = () => {
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
  
    useEffect(() => {
      dispatch(initBlogs())
    },[])
  
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
  
    //console.log(blogs)
    const blog= blogs.find(blog => blog.id === id)
  
    const onLike = (blog) => {
      dispatch(upvoteBlog(blog))
      dispatch(notify(`${blog.title} by ${blog.author} has been updated!`)) 
    }
  
    const handleComment = (event) => {
      event.preventDefault()
      //console.log(blog)
      setComment('')
  
      dispatch(commentOnBlog(blog, comment))
      dispatch(notify(`${blog.title} by ${blog.author} has been commented on!`)) 
    }
  
    const generateId = () =>
      Number((Math.random() * 1000000).toFixed(0))
  
    if (!blog) {
      return <div></div>
    }
    
    return (
      <Box ml="xl" mr="xl" >
        <div style={blogStyle}>
          <h2>{blog.title}</h2>
          <p></p>
          <a href={blog.url}>{blog.url}</a>
          <div>Added by {blog.user.name}</div>
          <div>Likes: {blog.likes} <Button onClick={() => onLike(blog)}>like</Button></div>
          <p></p>
          <h3>Comments</h3>
          <Flex>
            <form onSubmit={handleComment}>
              <TextInput
              type="text"
              value={comment}
              name="Comment"
              onChange = {({target}) => setComment(target.value)}
              />
              <Group justify="flex-end" mt="md">
                <Button type="submit">add comment</Button>
              </Group>
            </form>
          </Flex>
          
          <ul>
            {blog.comments.map(comment => <li key={blog.id + generateId()}>{comment}</li>)}
          </ul>
        </div>
      </Box>
    )
  }
  
export default BlogView