import { useDispatch } from "react-redux"
import style from "./layout.module.css"
import { initCart } from "../../store/cartSlice"
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "../../store/userSlice";

export default function Layout({children}){
    const {data} = useSession()
    const dispatch = useDispatch();

    useEffect(()=>{
        if(localStorage.carts){
            dispatch(initCart(JSON.parse(localStorage.carts)))
        }
        if(data){
            dispatch(signIn(data?.user))
        }
    },[dispatch, data])

    return <div className={style.container}>{children}</div>
}