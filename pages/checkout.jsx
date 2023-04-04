import React from 'react'
import Layout from '../components/layout'
import Head from 'next/head'
import CheckoutComponent from '../components/checkout/checkoutComponent'
import DeliveryMethod from '../components/checkout/deliveryMethod'
import PaymentMethod from '../components/checkout/paymentMethod'
import styles from './styles/checkout.module.css'
import { useSelector } from 'react-redux'

function Checkout() {
    const userFullName = "Olumide Bambe"
    const userAddress = "Adamolekun Estate, Adebayo, Ado-Ekiti, Ado Ekiti, Ekiti"
    const userPhoneNumber = "+2348104123456"
    const {cart} = useSelector(state => state.cart)
    const {totalProducts, products} = cart;
    return (
        <div>
            <Head>
                <title>Checkout Page</title>
            </Head>
            <main>
                <Layout>
                    <div className={styles.checkoutWrapper}>
                        <section>
                            <CheckoutComponent 
                                title="1. Address Details"
                            >
                                <h5>{userFullName}</h5>
                                <p>{userAddress}</p>
                                <p>{userPhoneNumber}</p>
                            </CheckoutComponent>
                            <CheckoutComponent title="2. Delivery Method">
                                <DeliveryMethod />
                            </CheckoutComponent>
                            <CheckoutComponent title="3. Payment Method">
                                <PaymentMethod />
                            </CheckoutComponent>
                        </section>
                        <aside className={styles.orderSummary}>
                            <h4>YOUR ORDER ({totalProducts} items)</h4>
                            <div>
                                <ul>
                                    {
                                        
                                    }
                                </ul>
                            </div>
                        </aside>

                    </div>
                </Layout>
            </main>
        </div>
    )
}

export default Checkout
