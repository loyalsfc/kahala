import Head from 'next/head'
import Checkout from '../../../components/checkoutpage/checkouttemplate'
import CheckoutComponent from '../../../components/checkout/checkoutComponent'
import DeliveryMethod from '../../../components/checkout/deliveryMethod'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import { useState } from 'react'
import AddressPreview from '../../../components/addressPreview/addressPreview'
import styles from './delivery.module.css'
import MobileCheckoutHeader from '../../../components/mobileCheckoutHeader/mobileCheckoutHeader'
import { getServerSession } from 'next-auth'

function Delivery({user, savedAddress}) {
    const {address, delivery_method} = savedAddress
    const {country_code, 
        phone_number, 
        first_name, 
        last_name,
        delivery_address,
        delivery_lga, 
        delivery_state} = address.find(item => item.isDefault == true)
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(delivery_method)

    return (
        <div>
            <Head>
                <title>Delivery Method | Kahala </title>
            </Head>
            <MobileCheckoutHeader text='Select delivery Method' />
            <Checkout deliveryMethod={selectedDeliveryMethod}>
                <div className={styles.wrapper}>
                    <CheckoutComponent 
                        title="Address Details"
                        linkTo="/pagecheckout/address"
                        showBtn = {true}
                    >
                        <AddressPreview address={address} />
                    </CheckoutComponent>
                    <CheckoutComponent title="Delivery Method" showBtn = {false}>
                        <DeliveryMethod 
                            deliveryMethod={selectedDeliveryMethod}
                            updateDeliveryMethod={setSelectedDeliveryMethod}
                        />
                    </CheckoutComponent>
                    <div className={styles.extraWrap}>
                        <CheckoutComponent title="Payment Method"/>
                    </div>
                </div>
            </Checkout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions)

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

    return {
        props: {user: session, savedAddress: userAddress[0]}
    }
}

export default Delivery
