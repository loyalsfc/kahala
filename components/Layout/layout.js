import { useDispatch, useSelector } from "react-redux"
import style from "./layout.module.css"
import { useEffect, useState } from "react";
import { useSession} from "next-auth/react";
import { signIn } from "../../store/userSlice";

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
        if(data){
            dispatch(signIn(data?.user))
        }
    },[data])

    return <div className={style.container}>{children}</div>
}