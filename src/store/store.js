    import { configureStore } from '@reduxjs/toolkit'

    import authReducer from './slices/AuthSlice'

    const rootReducer = {
        auth: authReducer,
    }

    export const store = configureStore({
        reducer: rootReducer,
    })