import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/authSlice'
import imageReducer from './slices/imageSlice'



export const store = configureStore({
    reducer: {
       
        user: userReducer,
        images: imageReducer,
        
        
    }
}) 