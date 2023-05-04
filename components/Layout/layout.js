import { useDispatch, useSelector } from "react-redux"
import style from "./layout.module.css"
import { addCart, initCart } from "../../store/cartSlice"
import { useEffect, useState } from "react";
import { useSession} from "next-auth/react";
import { signIn } from "../../store/userSlice";
import { supabase } from "../../lib/supabaseClient";

export default function Layout({children}){
    const {cart} = useSelector(state => state.cart)
    const {data, status} = useSession()
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(status === "unauthenticated"){
            localStorage.carts = JSON.stringify(cart.products);
        }
    },[cart])

    useEffect(()=>{
        // if(localStorage.carts){
        //     dispatch(initCart(JSON.parse(localStorage.carts)))
        // }
        if(data){
            dispatch(signIn(data?.user))
            // fetchCartItems();
        }

        // async function fetchCartItems(){
        //     let {data} = await supabase.from('cart').select();
        //     setFetchedCart(data)
        // }
    },[data])

    return <div className={style.container}>{children}</div>
}