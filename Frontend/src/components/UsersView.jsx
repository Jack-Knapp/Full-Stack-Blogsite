import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { initUsers } from '../reducers/userReducer'

import { Box } from '@mantine/core'

const UsersView = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(initUsers())
    },[])

    return (
      <div>
        <Box ml="xl" mr="xl" >
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Blogs Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => 
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
              </tr>)}
            </tbody>
          </table>
        </Box>
      </div>
    )
}

export default UsersView