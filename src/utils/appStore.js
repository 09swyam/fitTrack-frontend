import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import exerciseReducer from './exerciseSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        exercise: exerciseReducer,
    }
})

export default appStore;