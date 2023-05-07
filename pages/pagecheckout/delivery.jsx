import Head from 'next/head'
import Checkout from '../../components/checkoutpage/checkouttemplate'
import CheckoutComponent from '../../components/checkout/checkoutComponent'
import DeliveryMethod from '../../components/checkout/deliveryMethod'
import { getSession } from 'next-auth/react'
import { supabase } from '../../lib/supabaseClient'

function Delivery({user, address}) {
    const {country_code, phone_number, first_name, last_name, delivery_address, delivery_lga, delivery_state} = address.find(item => item.isDefault == true)

    return (
        <div>
            <Head>
                <title>Delivery Method | Kahala </title>
            </Head>
            <Checkout>
                <CheckoutComponent 
                    title="1. Address Details"
                    linkTo="/pagecheckout/address"
                    showBtn = {address ? true : false}
                >
                    <article style={{padding: "1rem 3rem"}}>
                        <h5>{first_name} {last_name}</h5>
                        <p>{delivery_address} | {delivery_lga} {delivery_state} | {country_code + phone_number} </p>
                    </article> 
                </CheckoutComponent>
                <CheckoutComponent title="2. Delivery Method" showBtn = {false}>
                    <DeliveryMethod />
                </CheckoutComponent>
                <CheckoutComponent title="3. Payment Method"/>
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

    const {data: userAddress} = await supabase.from('user').select().eq('user_id', session?.user?.email)

    if(!userAddress.length){
        return{
            redirect: {
                destination: '/pagecheckout/address',
                parmanent: false,
            }
        }
    }


    return {
        props: {user: session, address: userAddress[0].address}
    }
}

export default Delivery
