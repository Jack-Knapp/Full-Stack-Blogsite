import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

import { Button, Group, TextInput, Flex } from '@mantine/core'

const BlogForm = ({instanceRef}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const formStyle = {
        backgroundColor: 'whitesmoke',
        paddingTop: 0,
        paddingLeft: 12,
        paddingBottom: 10,
        border: 'dashed',
        borderWidth: 1,
        borderRadius: '8px',
        marginBottom: 0
    }

    const dispatch = useDispatch()

    const handlePost = (event) => {
        event.preventDefault()
        const newBlog = {
            "title": title,
            "author": author,
            "url": url,
            "likes": 0
        }
       
        dispatch(addBlog(newBlog))
        dispatch(notify(`${newBlog.title} by ${newBlog.author} has been added!`))
        instanceRef.current.toggleVisibility()
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const handleCancel = (event) => {
        instanceRef.current.toggleVisibility()
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <Flex>
            <form style={formStyle} onSubmit={handlePost}>
                <h2>Create New</h2>
                <TextInput
                styles= {{
                    root: {width: '15em'}
                }}
                mt="md"
                mr="xl"
                placeholder='Title'
                value={title}
                onChange = {({target}) => setTitle(target.value)}
                id='blog-title'
                />
                <TextInput
                mt="md"
                mr="xl"
                placeholder='Author'
                value={author}
                onChange = {({target}) => setAuthor(target.value)}
                id='blog-author'
                />
                <TextInput
                mt="md"
                mr="xl"
                placeholder='URL'
                value={url}
                onChange = {({target}) => setUrl(target.value)}
                id='blog-URL'
                />
                <Group justify="flex-end" mt="md" mr="xl">
                    <Button type='submit'>Submit</Button>
                    <Button type='button' onClick={handleCancel}>Cancel</Button>
                </Group>
            </form>
        </Flex>
    )
}

export default BlogForm