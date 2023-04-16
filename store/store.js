import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import saveReducer from './saveSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        save: saveReducer
    }
})

