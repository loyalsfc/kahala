import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: {
        totalPrice: 0,
        totalProducts: 0,
        products: []
    }
}

export const cartSlice  = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initCart: (state, action) => {
            state.cart = action.payload
        },
        addCart: (state, action) => {
            state.cart.products = [...state.cart.products, action.payload]
        },
        removeCart: (state, action) => {
            state.cart.products = state.cart.products.filter((product) => product.item.id !== action.payload)
        },
        increaseCartItem: (state, action) => {
            state.cart.products = state.cart.products.map(item => {
                if(item.item.id === action.payload){
                    return {...item, quantity: item.quantity + 1}
                } else {
                    return item
                }
            })
        },
        decreaseCartItem: (state, action) => {
            state.cart.products = state.cart.products.map(item => {
                if(item.item.id === action.payload){
                    return {...item, quantity: item.quantity - 1}
                } else {
                    return item
                }
            })
        },
        calculateTotal: (state) => {
            let total = 0;
            let amount = 0;
            state.cart.products.forEach(item => {
                total += item.quantity;
                amount += item.quantity * item.item.price;
            })
            state.cart.totalProducts = total;
            state.cart.totalPrice = amount;
            localStorage.carts = JSON.stringify(state.cart);
        }
    }
})

export const {initCart, addCart, removeCart, increaseCartItem, decreaseCartItem, calculateTotal} = cartSlice.actions
export default cartSlice.reducer