import React, {useState} from 'react'
import Layout from '../../components/Layout/layout'
import Head from 'next/head'
import Checkout from '../../components/checkoutpage/checkouttemplate'
import CheckoutComponent from '../../components/checkout/checkoutComponent'
import PaymentMethod from '../../components/checkout/paymentMethod'
import { supabase } from '../../lib/supabaseClient'
import { getSession } from 'next-auth/react'
import AddressPreview from '../../components/addressPreview/addressPreview'
import DeliveryPreview from '../../components/deliveryPreview/deliveryPreview'

function Payment({user, savedAddress}) {
    const {address, delivery_method, payment_method} = savedAddress;

    return (
        <div>
            <Head>
                <title>Payment</title>
            </Head>
            <Checkout deliveryMethod={delivery_method} isPaymentPage={true}>
                <CheckoutComponent 
                    title="1. Address Details"
                    linkTo="/pagecheckout/address"
                    showBtn = {true}
                >
                    <AddressPreview address={address}/>
                </CheckoutComponent>
                <CheckoutComponent 
                    title="2. Delivery Method"
                    linkTo="/pagecheckout/delivery"
                    showBtn={true}
                >
                    <DeliveryPreview deliveryMethod={delivery_method} />
                </CheckoutComponent>
                <CheckoutComponent title="3. Payment Method">
                    <PaymentMethod paymentMethod={payment_method} />
                </CheckoutComponent>
            </Checkout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)

    if(!session){
        return{
            redirect: {
                destination: '/auth',
                parmanent: false
            }
        }
    }

    const email = session?.user?.email
    const {data: userAddress} = await supabase.from('user').select().eq('user_id', email)

    if(!userAddress.length){
        return{
            redirect: {
                destination: '/pagecheckout/address',
                parmanent: false,
            }
        }
    }

    if(!userAddress[0].delivery_method){
        return{
            redirect: {
                destination: '/pagecheckout/delivery',
                parmanent: false,
            }
        }
    }

    return {
        props: {user: session, savedAddress: userAddress[0]}
    }
}

export default Payment