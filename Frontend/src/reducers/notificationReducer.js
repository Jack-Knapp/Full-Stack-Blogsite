import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            console.log(action.payload)
            return action.payload
        }
    }
})

export const notify = (content, time=3) => {
    return async dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 1000 * time)
    }
}

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer