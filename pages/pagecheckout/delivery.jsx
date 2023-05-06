import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout/layout'
import { useSelector } from 'react-redux'
import AddressForm from '../../components/checkout/addressForm'
import Head from 'next/head'
import Checkout from '../../components/checkoutpage/checkouttemplate'
import CheckoutComponent from '../../components/checkout/checkoutComponent'
import DeliveryMethod from '../../components/checkout/deliveryMethod'
import AddAddressModal from '../../components/checkout/addAddressModal'
import { getSession } from 'next-auth/react'
import { supabase } from '../../lib/supabaseClient'

function Delivery({user, address}) {
    const [displayAddressModal, setDisplayAddressModal] = useState(false)
    
    console.log(user, address)
    function openAddressModal(){
        //show address modal
        setDisplayAddressModal(true)
        //disable background scrolling
        document.body.style.overflow = "hidden"
    }   

    function closeModal(){
        //hide the modal
        setDisplayAddressModal(false)
        //remove the overflow hidden property on modal close
        document.body.style.overflow = "unset"
    }

    // useEffect(()=>{
    //     getAddress()
    // },[])

    async function getAddress(){
        const address = await supabase.from('user').select();
        console.log(address)
    }

    return (
        <div>
            <Head>
                <title>Delivery Method | Kahala </title>
            </Head>
            <Checkout>
                {displayAddressModal && <AddAddressModal handleClick={closeModal} />}
                <CheckoutComponent 
                    title="1. Address Details"
                    handleClick = {openAddressModal}
                    showBtn = {address ? true : false}
                >
                    <article style={{padding: "1rem 3rem"}}>
                        {`<h5>{userFullName}</h5>
                        <p>{userAddress}</p>
                        <p>{userPhoneNumber}</p>`}
                    </article> 
                </CheckoutComponent>
                <CheckoutComponent title="2. Delivery Method" showBtn = {address ? true : false}>
                    <DeliveryMethod />
                </CheckoutComponent>
                <CheckoutComponent title="3. Payment Method"/>
            </Checkout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)
    const {data: address} = await supabase.from('user').select().eq('user_id', session?.user?.email)

    if(!session){
        return{
            redirect: {
                destination: '/auth',
                parmanent: false
            }
        }
    }

    if(!address.length){
        return{
            redirect: {
                destination: '/pagecheckout/address',
                parmanent: false,
            }
        }
    }


    return {
        props: {user: session, address}
    }
}

export default Delivery
