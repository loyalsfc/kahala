import '../styles/globals.css'
import {Roboto} from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../store/store'
import {SessionProvider, useSession} from 'next-auth/react'
import { useEffect } from 'react'
import { fetchCart } from '../lib/fetchCart'
import { initCart } from '../store/cartSlice'
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
            //If yes, fetch cart from DB
            dispatch(fetchCart(data?.user?.email))
        }else if(status === "unauthenticated"){
            //Otherwise fetch cart from localStorage
            if(localStorage.carts){
                dispatch(initCart(JSON.parse(localStorage.carts)));   
            }
        }
    },[data])

    return(
        <>
            {children}
        </>
    )
}