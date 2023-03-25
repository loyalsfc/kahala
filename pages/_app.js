import '../styles/globals.css'
import {Roboto} from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const roboto = Roboto({
    weight: ['400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})

export default function App ({Component, pageProps}){
    return(
        <>
            <style jsx global>{`
                html{
                    font-family: ${roboto.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
        )
}