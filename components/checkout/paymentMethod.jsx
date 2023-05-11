import { faHandHoldingDollar, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './checkout.module.css'
import { supabase } from '../../lib/supabaseClient'
import { useSelector } from 'react-redux'
import Link from 'next/link'

function PaymentMethod({paymentMethod}) {
    const {user} = useSelector(state => state.user)
    const updatePaymentMethod = async(e) =>{
        const method = e.target.id;
        if(paymentMethod == method) return;
        const {error} = await supabase
            .from('user')
            .update({payment_method: method})
            .eq('user_id', user?.email);
    }
    console.log(paymentMethod)
    return (
        <div className={styles.paymentMethodWrapper}>
            <div>
                <div className={styles.cardPaymentWrapper}>
                    <div className={styles.radioLabelWrapper}>
                        <input 
                            onChange={updatePaymentMethod} 
                            type='radio' 
                            name='payment-method' 
                            id='card-payment' 
                            defaultChecked={paymentMethod == "card-payment" ? true : false}
                        />
                        <label className={styles.labels} htmlFor="card-payment">
                            <p>
                                Pay with Cards, Bank Transfer or USSD<br/>
                                <span className={styles.fs12}>You will be redirected to our secure checkout page</span>
                            </p>
                            <FontAwesomeIcon icon={faShieldAlt} color='#4c90e2' />
                        </label>
                    </div>
                    <ul className={styles.paymentMethodDetails}>
                        <li>- Payment with Verve Cards is currently unavailable.</li>
                        <li>- Kindly note that you will be redirected to payment platform to complete your purchase.</li>
                        <li>- Ensure your payment information is up to date and that you have the necessary funds.</li>
                        <li>- For bank transfer, kindly ensure you transfer the exact amount displayed.</li>
                        <li>- Payment confirmation may take up to 2 minutes.</li>
                    </ul>
                </div>
                <div className={`${styles.radioLabelWrapper} ${styles.cardPaymentWrapper}`}>
                    <input 
                        onChange={updatePaymentMethod} 
                        type="radio" 
                        name='payment-method' 
                        id='fcb-payment'
                        defaultChecked={paymentMethod == "fcb-payment" ? true : false}
                    />
                    <label className={styles.labels} htmlFor='fcb-payment'>
                        <p>
                            <span>Standard Chartered Credit Card @ 1.5% Interest - Up to 12 months</span><br/>
                            <span className={styles.fs12}>Terms and Conditions Apply</span>
                        </p>   
                        <FontAwesomeIcon icon={faShieldAlt} color='#4c90e2' />
                    </label>
                </div>
                <div className={styles.payOnDelivery}>
                    <div className={styles.radioLabelWrapper}>
                        <input 
                            onChange={updatePaymentMethod} 
                            type="radio" 
                            name='payment-method' 
                            id='pay-on-delivery' 
                            defaultChecked={paymentMethod == "pay-on-delivery" ? true : false}
                            def
                        />
                        <label className={styles.labels} htmlFor='pay-on-delivery'> 
                            <p>
                                Pay on Delivery <br/>
                                <span className={styles.fs12}> With Cash, Bank Transfer Or Cash</span>
                            </p>
                            <FontAwesomeIcon icon={faHandHoldingDollar} color='#F68B1E' />
                        </label>
                    </div>
                    <ul className={styles.paymentMethodDetails}>
                        <li>- You can pay with your card or bank transfer via your bank at the time of delivery; simply inform our delivery agent when your order is being delivered.</li>
                        <li>- Kindly note that you would have to make payment before opening your package.</li>
                        <li>- Once the seal is broken, the item can only be returned if it is damaged, defective, or has missing parts.</li>
                        <li>- We will never ask you for your password, PIN, CVV or full card details over the phone or via email.</li>
                    </ul>
                </div>
                <Link href="/pagecheckout/summary">
                    <button className={styles.proceedBtn}>CONFIRM PAYMENT METHOD</button>
                </Link>
            </div>
        </div>
    )
}

export default PaymentMethod
