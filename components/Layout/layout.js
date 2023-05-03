import { useDispatch } from "react-redux"
import style from "./layout.module.css"
import { addCart, initCart } from "../../store/cartSlice"
import { useEffect, useState } from "react";
import { useSession} from "next-auth/react";
import { signIn } from "../../store/userSlice";
import { supabase } from "../../lib/supabaseClient";

export default function Layout({children}){
    const [fetchedCart, setFetchedCart] = useState([])
    const {data} = useSession()
    const dispatch = useDispatch();

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

    // useEffect(()=>{
    //     console.log(fetchedCart);
    //     fetchedCart.forEach(element => {
    //         dispatch(addCart(element))
    //     });
    // },[fetchedCart])

    return <div className={style.container}>{children}</div>
}