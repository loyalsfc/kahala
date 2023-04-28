import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./styles/auth.module.css"
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Auth() {
    const router = useRouter();
    const {data} = useSession();
    
    useEffect(()=>{
        if(data){
            router.push('/')
        }
    }, [data, router])

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.shieldLogo}>
                        <FontAwesomeIcon icon={faShieldAlt} />
                    </div>
                    <h1 className={styles.title}>Welcome to Kahala Store</h1>
                    <p className={styles.text}>Select a provider to login to log in or create a Kahala account</p>
                    <button onClick={()=> signIn("google")} className={styles.googleBtn}>
                        <Image alt='Google Logo' loading="lazy" height="24" width="24" src="https://authjs.dev/img/providers/google.svg"/>
                        Login with Google
                    </button>
                    <button onClick={()=>signIn('github')} className={styles.googleBtn}>
                        <Image alt='Github logo' loading="lazy" height="24" width="24" src="https://authjs.dev/img/providers/github.svg"/>
                        Login with Github
                    </button>
                </div>
            </div>
        </>
    )
}

export default Auth
