import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { initBlogs } from './reducers/blogReducer'

import BlogsList from './components/BlogsList'
import BlogView from './components/BlogView'
import LoginMenu from './components/LoginMenu'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import UserView from './components/UserView'

import '@mantine/core/styles.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  return (
    <Router>
      <Notification/>
      <LoginMenu/>
      
      <Routes>
        <Route path="/" element={<BlogsList/>}/>
        <Route path="/blogs" element={<BlogsList/>}/>
        <Route path="/blogs/:id" element={<BlogView/>}/>
        <Route path="/users" element={<UsersView/>}/>
        <Route path="/users/:id" element={<UserView/>}/>
      </Routes>
    
    </Router>

  )
}

export default App
