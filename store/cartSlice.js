import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../lib/fetchCart";

const initialState = {
    cart: {
        totalPrice: 0,
        totalProducts: 0,
        products: []
    },
    status: "idle"
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
            state.cart.products = state.cart.products.filter((product) => product.item._id !== action.payload)
        },
        increaseCartItem: (state, action) => {
            state.cart.products = state.cart.products.map(item => {
                if(item.item._id === action.payload){
                    return {...item, quantity: item.quantity + 1}
                } else {
                    return item
                }
            })
        },
        decreaseCartItem: (state, action) => {
            state.cart.products = state.cart.products.map(item => {
                if(item.item._id === action.payload){
                    return {...item, quantity: item.quantity - 1}
                } else {
                    return item
                }
            })
        },
        calculateTotal: (state) => {
            calculateCartTotals(state)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart.products = action.payload;
                calculateCartTotals(state);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

function calculateCartTotals(state){
    let total = 0;
    let amount = 0;
    state.cart.products.forEach(item => {
        total += item.quantity;
        amount += item.quantity * item.item.amount;
    })
    state.cart.totalProducts = total;
    state.cart.totalPrice = amount;
}

export const {initCart, addCart, removeCart, increaseCartItem, decreaseCartItem, calculateTotal} = cartSlice.actions
export default cartSlice.reducer