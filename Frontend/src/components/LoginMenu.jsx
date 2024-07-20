import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

import {notify} from '../reducers/notificationReducer'
import {changeUser, logOutUser} from '../reducers/currentUserReducer'

import loginService from '../services/login'

import { Button, Group, TextInput, 
  PasswordInput, Container
} from '@mantine/core'

const LoginMenu = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const currUser = useSelector(state => state.currentUser)

  useEffect (() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(changeUser(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch(changeUser(user))
 
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Invalid Credentials')
      dispatch(notify('ERROR: Invalid Username or Password!'))
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logOutUser())
  }

  const loginForm = () => (
      <Container size='50%'>
        <h2>Log in to Blogsite</h2>
        <form onSubmit={handleLogin}>
          <TextInput
            mt="md"
            placeholder='Username'
            value={username}
            onChange = {({target}) => setUsername(target.value)}
          />
          <PasswordInput
            mt="md"
            placeholder='Password'
            value={password}
            onChange = {({target}) => setPassword(target.value)}
          />
          <Group justify="flex-end" mt="md">
            <Button type='submit'>Login</Button>
          </Group>
        </form>
      </Container>
  )

  const menu = () => {
    const padding = {
      paddingRight: 5,
      paddingLeft: 15
    }

    return (
      <div>
        <Container>
          <h2>BlogSite</h2>
          <Group
           styles= {{
            root: {
              backgroundColor: 'gainsboro',
              borderRadius: '8px'
            }
          }}
          >
            <Link style={padding} to='/blogs'>Blogs</Link>
            <Link style={padding} to='/Users'>Users</Link>
            <div>
              {currUser.name} is logged in 
              <Button ml="sm" mt="md" mb="md"onClick={handleLogout}>logout</Button>
            </div>
          </Group>
        </Container>
        <p></p>
      </div>
    )
  }

  return (
    <div>
        {!currUser.username ? loginForm() : menu() }
    </div>
  )
}

export default LoginMenu