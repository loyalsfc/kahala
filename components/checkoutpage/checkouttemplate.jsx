import React, { useEffect, useState } from 'react'
import Layout from '../Layout/layout'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import DeliverySumUp from '../checkout/deliverySumUp'
import Link from 'next/link'
import AddAddressModal from '../checkout/addAddressModal'
import CheckoutLayout from '../Layout/checkoutLayout/checkoutLayout'
import styles from './checkoutTemplate.module.css'
import { priceConverion, urlFor } from '../../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons'

function Checkout({children}) {
    const [displayAddressModal, setDisplayAddressModal] = useState(false)
    const {cart} = useSelector(state => state.cart)
    const {totalProducts, products, totalPrice} = cart;

    function openAddressModal(){
        //show address modal
        setDisplayAddressModal(true)
        //disable background scrolling
        document.body.style.overflow = "hidden"
    }   

    function closeModal(){
        //hide the modal
        setDisplayAddressModal(false)
        //remove the overflow hidden property on modal close
        document.body.style.overflow = "unset"
    }

    return (
        <div>
            <Head>
                <title>Checkout Page</title>
            </Head>
            <CheckoutLayout>
                <Layout>
                    {displayAddressModal && <AddAddressModal handleClick={closeModal} />}
                    <main>
                        <div className={styles.checkoutWrapper}>
                            <section style={{flex: 1}}>
                                <div>
                                    {children}
                                </div>
                            </section>
                            <aside className={styles.orderSummary}>
                                <div>
                                    <h4>Order Summary</h4>
                                    <p className={styles.totalProduct}>Item's total ({totalProducts}) <span>₦{priceConverion(totalPrice)}</span></p>
                                    <div className={styles.deliverySumWrap}>
                                        <DeliverySumUp />
                                    </div> 
                                    <p className={styles.addCoupon}>
                                        <FontAwesomeIcon icon={faVrCardboard} color='#f68b1e' />
                                        <span>You will be able to add a voucher when selecting your payment method.</span> 
                                    </p>
                                    <div className={styles.confirmOrderBtnBtnWrap}>
                                        <button disabled={true} className={styles.confirmOrderBtn}>
                                            Confirm Order
                                        </button>
                                        <span>(Complete the steps in order to proceed)</span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </main>
                </Layout>
            </CheckoutLayout>
        </div>
    )
}

export default Checkout
