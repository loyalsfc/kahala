import React from 'react'
import Layout from '../components/layout'
import Head from 'next/head'
import CheckoutComponent from '../components/checkout/checkoutComponent'
import DeliveryMethod from '../components/checkout/deliveryMethod'

function Checkout() {
    const userFullName = "Olumide Bambe"
    const userAddress = "Adamolekun Estate, Adebayo, Ado-Ekiti, Ado Ekiti, Ekiti"
    const userPhoneNumber = "+2348104123456"


    return (
        <div>
            <Head>
                <title>Checkout Page</title>
            </Head>
            <main>
                <Layout>
                    <div>
                        <section>
                            <CheckoutComponent 
                                title="1. Address Details"
                            >
                                <h5>{userFullName}</h5>
                                <p>{userAddress}</p>
                                <p>{userPhoneNumber}</p>
                            </CheckoutComponent>
                            <CheckoutComponent title="2. Delivery Method">
                                <DeliveryMethod />
                            </CheckoutComponent>
                        </section>
                        <aside></aside>
                    </div>
                </Layout>
            </main>
        </div>
    )
}

export default Checkout
