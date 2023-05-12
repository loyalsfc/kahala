import React, { useState } from 'react'
import styles from '../checkoutpage/checkoutTemplate.module.css'
import { priceConverion } from '../../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

function OrderSummary({deliveryMethod, isPaymentPage, isSummaryPage, confirmOrder}) {
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
        <div className={styles.orderSummary}>
            <h4 className='borderBottom'>Order Summary</h4>
            <div className={styles.mainWrap}>
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
                    <button onClick={confirmOrder} disabled={isSummaryPage ? false : true} className={styles.confirmOrderBtn}>
                        Confirm Order
                    </button>
                    <span>(Complete the steps in order to proceed)</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
