import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import saveReducer from './saveSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        save: saveReducer,
        user: userReducer
    }
})

