import React from 'react'
import CheckoutHeader from './checkoutHeader'

function CheckoutLayout({children}) {
  return (
        <div>
          <CheckoutHeader />
            {children}
        </div>
  )
}

export default CheckoutLayout
