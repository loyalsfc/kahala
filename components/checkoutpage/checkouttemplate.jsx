import React from 'react'
import Layout from '../Layout/layout'
import CheckoutLayout from '../Layout/checkoutLayout/checkoutLayout'
import styles from './checkoutTemplate.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import OrderSummary from '../orderSummary/orderSummary'

function Checkout({children, deliveryMethod, isPaymentPage, isSummaryPage, confirmOrder}) {
    
    return (
            <CheckoutLayout>
                <Layout>
                    <main>
                        <div className={styles.checkoutWrapper}>
                            <section style={{flex: 1}}>
                                <div>
                                    {children}
                                </div>
                                <Link className={styles.continueLink} href="/">
                                    <FontAwesomeIcon icon={faAngleLeft} /> Go back & continue shopping
                                </Link>
                            </section>
                            <aside className={styles.aside}>
                                <OrderSummary 
                                    deliveryMethod={deliveryMethod}
                                    isPaymentPage={isPaymentPage}
                                    isSummaryPage={isSummaryPage}
                                    confirmOrder={confirmOrder}
                                />
                            </aside>
                        </div>
                    </main>
                </Layout>
            </CheckoutLayout>
    )
}

export default Checkout
