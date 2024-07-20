import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { initUsers } from '../reducers/userReducer'

const UserView = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(initUsers())
    },[])

    const user = users.find(user => user.id === id)
  
    if (!user) {
      return <div></div>
    }
  
    return (
      <div>
        <h2>{user.name}</h2>
        <p></p>
        <h3>Added Blogs</h3>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li> )}
        </ul>
      </div>
    ) 
}

export default UserView