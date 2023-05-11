import React from 'react'
import Checkout from '../checkoutpage/checkouttemplate'
import CheckoutComponent from '../checkout/checkoutComponent'
import MobileCheckoutHeader from '../mobileCheckoutHeader/mobileCheckoutHeader'

function AddressCheckout({title, children}) {
    return (
        <>
            <MobileCheckoutHeader text={title} />
            <Checkout>
                <CheckoutComponent 
                    title="1. Address Details"
                    showBtn = {false}
                >
                    {children}
                </CheckoutComponent>
                <CheckoutComponent title="2. Delivery Method"/>
                <CheckoutComponent title="3. Payment Method"/>
            </Checkout>
        </>
    )
}

export default AddressCheckout
