import React, {useState} from 'react'
import AddressForm from '../../components/checkout/addressForm'
import Head from 'next/head'
import Checkout from '../../components/checkoutpage/checkouttemplate'
import AddAddressModal from '../../components/checkout/addAddressModal'
import CheckoutComponent from '../../components/checkout/checkoutComponent'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { client } from '../../utils/utils'
import { supabase } from '../../lib/supabaseClient'

function Address({user,address}) {
    const router = useRouter()
    const [displayAddressModal, setDisplayAddressModal] = useState(false)
    // const address = null;
    const userFullName = "Olumide Bambe"
    const userAddress = "Adamolekun Estate, Adebayo, Ado-Ekiti, Ado Ekiti, Ekiti"
    const userPhoneNumber = "+2348104123456"
    
    
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

    function moveRoute(){
        router.push('/pagecheckout/delivery')
    }


    return (
            <Checkout>
                <CheckoutComponent 
                    title="1. Address Details"
                    handleClick = {openAddressModal}
                    showBtn = {address ? true : false}
                >
                {address.length ? ( 
                            <article>
                                <h5>{userFullName}</h5>
                                <p>{userAddress}</p>
                                <p>{userPhoneNumber}</p>
                            </article> 
                        ):(
                            <AddressForm callback={moveRoute} />
                        )
                    }
                </CheckoutComponent>
                <CheckoutComponent title="2. Delivery Method"/>
                <CheckoutComponent title="3. Payment Method"/>
            </Checkout>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context);
    const {data: address} = await supabase.from('user').select().eq('user_id', session?.user?.email)

    if(!session){
        return{
            redirect: {
                destination: '/auth',
                parmanent: false
            }
        }
    }

    if(address.length){
        return{
            redirect:{
                destination: '/pagecheckout/delivery',
                parmanent: false
            }
        }
    }

    return {
        props: {user: session,address}
    } 
}

export default Address
