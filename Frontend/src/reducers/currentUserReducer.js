import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setUser(state,action) {
            return action.payload
        }
    }
})

export const {setUser} = currentUserSlice.actions

export const changeUser = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const logOutUser = () => {
    return async dispatch => {
        blogService.setToken(null)
        dispatch(setUser(''))
    }
}

export default currentUserSlice.reducer