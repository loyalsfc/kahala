import '../styles/globals.css'
import {Roboto} from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../store/store'
import {SessionProvider, useSession} from 'next-auth/react'
import { useEffect } from 'react'
import { fetchCart } from '../lib/fetchCart'
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
    const {data} = useSession()
    useEffect(()=>{
        console.log(data)
        dispatch(fetchCart())
    },[])

    return(
        <>
            {children}
        </>
    )
}