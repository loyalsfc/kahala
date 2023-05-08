import { faDollar, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import styles from './checkout.module.css'

function PaymentMethod() {
    return (
        <div className={styles.paymentMethodWrapper}>
            <h4>How do you want to pay for your order?</h4>
            <div>
                <div className={styles.cardPaymentWrapper}>
                    <div className={styles.radioLabelWrapper}>
                        <input type='radio' name='payment-method' id='card-payment' />
                        <label htmlFor="card-payment">Pay with Cards, Bank Transfer or USSD</label>
                    </div>
                    <ul className={styles.paymentMethodDetails}>
                        <li>- Payment with Verve Cards is currently unavailable.</li>
                        <li>- Kindly note that you will be redirected to JumiaPay platform to complete your purchase.</li>
                        <li>- Ensure your payment information is up to date and that you have the necessary funds.</li>
                        <li>- For bank transfer, kindly ensure you transfer the exact amount displayed.</li>
                        <li>- Payment confirmation may take up to 2 minutes.</li>
                    </ul>
                </div>
                <div className={`${styles.radioLabelWrapper} ${styles.cardPaymentWrapper}`}>
                    <input type="radio" name='payment-method' id='fcb-payment'/>
                    <label htmlFor='fcb-payment'>
                        <Image
                            src="/SCB.jpg"
                            height={46}
                            width={100}
                            alt='scb logo'
                        />
                        <span>Standard Chartered Credit Card @ 1.5% Interest - Up to 12 months</span>
                    </label>
                </div>
                <div className={styles.payOnDelivery}>
                    <div className={styles.radioLabelWrapper}>
                        <input type="radio" name='payment-method' id='pay-on-delivery' disabled/>
                        <label htmlFor='pay-on-delivery'><FontAwesomeIcon icon={faMoneyBill} size='2xl' /> Pay on Delivery</label>
                    </div>
                    <p>Unavailable</p>
                </div>
                <div className={styles.voucherWrapper}>
                    <h4>Got a Kahala voucher / SureGifts voucher? Use it below:</h4>
                    <div className={styles.voucherInputWrapper}>
                        <input type='text' placeholder='Enter Voucher / Sure Gift Code here' />
                        <button>Add Voucher</button>
                    </div>
                </div>
                <button className={styles.proceedBtn}>CONFIRM ORDER</button>
            </div>
        </div>
    )
}

export default PaymentMethod
