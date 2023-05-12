import React from 'react'
import HomeLayout from '../../components/Layout/homeLayout'
import Layout from '../../components/Layout/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from './ordercomplete.module.css'
function Success() {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Order Successful</title>
            </Head>
            <HomeLayout>
                <Layout>
                    <article className={styles.article}>
                        <h3 className={styles.heading}>Your order has been received</h3>
                        <div className={styles.checkWrapper}>
                            <FontAwesomeIcon icon={faCheckCircle} size='2xl' color='#4BB543'/> 
                        </div>
                        <h4 className={styles.thankYou}>Thank you for your purchase</h4>
                        <p>Your order ID is: {router.query.id}</p>
                        <p>You will receive an order confirmation email with details of your order.</p>
                        <Link href="/">
                            <button className={styles.continueBtn}>CONTINUE SHOPPING</button>
                        </Link>
                    </article>
                </Layout>
            </HomeLayout>
        </div>
    )
}

export default Success
