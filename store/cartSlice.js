import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

export const cartSlice  = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cart = [...state.cart, action.payload]
        },
        removeCart: (state, action) => {
            state.cart = [state.cart.filter((item) => item.id !== action.payload)]
        },
        modifyCart: (state, action) => {
            state.cart = state.cart.map(item => {
                if(item.id === action.payload){
                    return {...item, qty: item.qty + 1}
                } else {
                    return item
                }
            })
        }
    }
})

export const {addCart, removeCart, modifyCart} = cartSlice.actions
export default cartSlice.reducer