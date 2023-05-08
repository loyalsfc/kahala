import React, { useEffect, useState } from 'react'
import Layout from '../Layout/layout'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import CheckoutLayout from '../Layout/checkoutLayout/checkoutLayout'
import styles from './checkoutTemplate.module.css'
import { priceConverion } from '../../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons'

function Checkout({children, deliveryMethod, isPaymentPage}) {
    const [coupon, setCoupon] = useState('')
    const {cart} = useSelector(state => state.cart)
    const {totalProducts, totalPrice} = cart;
    const doorDeliveryPerItem = 1200;
    const pickupDeliveryPerItem = 420;

    const calculateDeliveryFee = () =>{
        if(deliveryMethod === 'door'){
            return doorDeliveryPerItem * totalProducts;
        }
        return pickupDeliveryPerItem * totalProducts;
    }

    const handleChange = (e) => {
        setCoupon(e.target.value)
    }
    
    return (
        <div>
            <CheckoutLayout>
                <Layout>
                    <main>
                        <div className={styles.checkoutWrapper}>
                            <section style={{flex: 1}}>
                                <div>
                                    {children}
                                </div>
                            </section>
                            <aside className={styles.orderSummary}>
                                <div>
                                    <h4 className='borderBottom'>Order Summary</h4>
                                    <article className='borderBottom'>
                                        <p className={styles.totalProduct}>
                                            Item&apos;s total ({totalProducts}) 
                                            <span>₦{priceConverion(totalPrice)}</span>
                                        </p>
                                        {deliveryMethod && <p className={styles.totalProduct}>
                                            <span>Delivery fees</span>
                                            <span className={styles.priceSum}>₦{priceConverion(calculateDeliveryFee())}</span>
                                        </p>}
                                    </article>
                                    <div className={`${styles.deliverySumWrap} borderBottom`}>
                                        <p className={styles.subTotals}>
                                            Total
                                            <span>₦{priceConverion(deliveryMethod ? (totalPrice + calculateDeliveryFee()) : totalPrice)}</span>
                                        </p>
                                        
                                    </div> 
                                    {!isPaymentPage ? (<p className={`${styles.addCoupon} borderBottom`}>
                                        <FontAwesomeIcon icon={faVrCardboard} color='#f68b1e' />
                                        <span>You will be able to add a voucher when selecting your payment method.</span> 
                                    </p>):(
                                        <form className={styles.form}>
                                            <div className={styles.formWrapper}>
                                                <input 
                                                    onChange={handleChange}
                                                    className={styles.couponInput} 
                                                    value={coupon}
                                                    type="text" 
                                                    placeholder='Enter Code Here'
                                                />
                                                <span><FontAwesomeIcon icon={faVrCardboard} /></span>
                                            </div>
                                            <button disabled={coupon == "" ? true : false} className={styles.couponBtn}>Apply</button>
                                        </form>
                                    )}
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
