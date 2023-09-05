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
import Head from 'next/head'
import Script from 'next/script'
config.autoAddCss = false

const roboto = Roboto({
    weight: ['400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})

export default function App ({Component, pageProps: {session, ...pageProps}}){
    return(
        <>
            <Script
                id='adsnygoogle-init'
                async={true} 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4285423806922676"
                crossorigin="anonymous"
            />
            <style jsx global>{`
                html{
                    font-family: ${roboto.style.fontFamily};
                }
            `}</style>
                <Head>
                    <link rel='shortcut icon' href='/favicon.png' />
                </Head>
                <SessionProvider session={session}>
                    <Provider store={store}>
                        <StateWrapper>
                            <ToastContainer />
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
            initAuthenticatedUser()
        }else if(status === "unauthenticated"){
            //Otherwise fetch cart from localStorage
            if(localStorage.carts){
                dispatch(initCart(JSON.parse(localStorage.carts)));   
            }
        }
    },[data])

    async function initAuthenticatedUser(){
        const email = data?.user?.email
        //Check if there are some carts in localStorage
        if(localStorage.carts){
            let storageCarts = JSON.parse(localStorage.carts);
            let items_to_cart = storageCarts.map(item =>{
                return {...item, user_id: email}
            })
            const { error } = await supabase
                .from('cart')
                .insert(items_to_cart)
            console.log(error)
            //Remove items from local storage
            localStorage.removeItem('carts');
        }
        //Fetch carts from DB
        dispatch(fetchCart(email))
        dispatch(fetchSaves(email))
    }

    return(
        <>
            {children}
        </>
    )
}