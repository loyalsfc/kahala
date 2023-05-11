import React from 'react'
import Checkout from '../checkoutpage/checkouttemplate'
import CheckoutComponent from '../checkout/checkoutComponent'
import MobileCheckoutHeader from '../mobileCheckoutHeader/mobileCheckoutHeader'
import styles from './addressCheckout.module.css'

function AddressCheckout({title, children}) {
    return (
        <>
            <MobileCheckoutHeader text={title} />
            <Checkout>
                <CheckoutComponent 
                    title="Address Details"
                    showBtn = {false}
                >
                    {children}
                </CheckoutComponent>
                <div className={styles.showOtherSummary}>
                    <CheckoutComponent title="Delivery Method"/>
                    <CheckoutComponent title="Payment Method"/>
                </div>
            </Checkout>
        </>
    )
}

export default AddressCheckout
