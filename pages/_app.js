import '../styles/globals.css'
import {Roboto} from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../store/store'
import {SessionProvider, useSession} from 'next-auth/react'
import { useEffect } from 'react'
import { fetchCart, fetchSaves } from '../lib/fetchCart'
import { initCart } from '../store/cartSlice'
import { supabase } from '../lib/supabaseClient'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
config.autoAddCss = false

const roboto = Roboto({
    weight: ['400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})

export default function App ({Component, pageProps: {session, ...pageProps}}){
    return(
        <>
            <style jsx global>{`
                html{
                    font-family: ${roboto.style.fontFamily};
                }
            `}</style>
                <SessionProvider session={session}>
                    <Provider store={store}>
                        <StateWrapper>
                            <ToastContainer 
                                
                            />
                            <Component {...pageProps} />
                        </StateWrapper>
                    </Provider>
                </SessionProvider>

        </>
        )
}

function StateWrapper({children}){
    const dispatch = useDispatch();
    const {data, status} = useSession();

    useEffect(()=>{
        //Check if user is authenticated
        if(status === "authenticated"){
            const email = data?.user?.email
            //Check if there are some carts in localStorage
            if(localStorage.carts){
                let storageCarts = JSON.parse(localStorage.carts);
                storageCarts.forEach(async(cart) => {
                    await addToCart(cart, email)
                });
                //Remove items from cart
                localStorage.removeItem('carts');
            }
            //Fetch carts from DB
            dispatch(fetchCart(email))
            dispatch(fetchSaves(email))
        }else if(status === "unauthenticated"){
            //Otherwise fetch cart from localStorage
            if(localStorage.carts){
                dispatch(initCart(JSON.parse(localStorage.carts)));   
            }
        }
    },[data])

    async function addToCart(cart, email){
        const {data, error} = await supabase.from('cart')
            .insert({item: cart.item, quantity: cart.quantity, user_id: email})
    }

    return(
        <>
            {children}
        </>
    )
}