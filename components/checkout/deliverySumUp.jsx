import React from 'react'
import styles from './checkout.module.css'
import { useSelector } from 'react-redux'
import { priceConverion } from '../../utils/utils'

function DeliverySumUp({deliveryFee}) {
    const {cart} = useSelector(state => state.cart)
    return (
        <div>
            <p className={styles.subTotals}>
                <span>Subtotal</span>
                <span>₦{priceConverion(cart.totalPrice)}</span>
            </p>
            <p className={`${styles.subTotals} ${styles.deliveryFee}`}>
                <span>deliveryFee</span>
                <span className={styles.priceSum}>{deliveryFee ? deliveryFee : "N.A"}</span>
            </p>
            <p className={`${styles.subTotals} ${styles.totalSum}`}>
                <span>Total</span>
                <span className={styles.priceSum}>{deliveryFee ? (deliveryFee + cart.totalPrice) : "N.A"}</span>
            </p>
        </div>
    )
}

export default DeliverySumUp
