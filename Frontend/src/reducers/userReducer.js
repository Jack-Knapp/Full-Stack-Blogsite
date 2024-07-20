import { createSlice } from "@reduxjs/toolkit"
import userService from '../services/users'

const initialState = []

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }
})

export const {setUsers} = userSlice.actions

export const initUsers = () => {
    return async dispatch => {
        userService.getAll().then(response => dispatch(setUsers(response)))
    }
}

export default userSlice.reducer