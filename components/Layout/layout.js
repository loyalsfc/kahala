import { useDispatch, useSelector } from "react-redux"
import style from "./layout.module.css"
import { useEffect } from "react";
import { useSession} from "next-auth/react";
import { signIn } from "../../store/userSlice";

export default function Layout({children}){
    const {data} = useSession()
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart)
    const {status} = useSession()
    console.log(status)
    useEffect(()=>{
        if(data){
            dispatch(signIn(data?.user))
        }
    },[data])
    console.log(cart)

    useEffect(()=>{
        if(status === "unauthenticated"){
            localStorage.carts = JSON.stringify(cart.products)
        }
    }, [cart])

    return <div className={style.container}>{children}</div>
}