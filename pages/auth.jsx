import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./styles/auth.module.css"
import { signIn } from 'next-auth/react'
import Head from 'next/head'

function auth() {
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
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </>
    )
}

export default auth
