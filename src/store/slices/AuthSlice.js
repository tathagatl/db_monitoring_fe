import { createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isSignedIn: false,
        isAuthChecked: false,
    },
    reducers: {
        setAuthChecked(state) {
            state.isAuthChecked = true
        },
        login(state) {
            state.isSignedIn = true
        },
        logout(state) {
            state.isSignedIn = false
        }
    }
})

export const {setAuthChecked, login, logout} = authSlice.actions

export default authSlice.reducer