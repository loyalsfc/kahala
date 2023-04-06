import React, {useState} from 'react'
import Layout from '../../components/Layout/layout'
import { useSelector } from 'react-redux'
import AddressForm from '../../components/checkout/addressForm'
import Head from 'next/head'
import Checkout from '../../components/checkoutpage/checkouttemplate'
import CheckoutComponent from '../../components/checkout/checkoutComponent'

function address() {
    const [displayAddressModal, setDisplayAddressModal] = useState(false)
    const address = null;
    const userFullName = "Olumide Bambe"
    const userAddress = "Adamolekun Estate, Adebayo, Ado-Ekiti, Ado Ekiti, Ekiti"
    const userPhoneNumber = "+2348104123456"
    const {cart} = useSelector(state => state.cart)
    const {totalProducts, products} = cart;

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



    return (
        <div>
            <Head>
                <title>Address Details | Kahala </title>
            </Head>
            <Checkout>
                {displayAddressModal && <AddAddressModal handleClick={closeModal} />}
                <CheckoutComponent 
                    title="1. Address Details"
                    handleClick = {openAddressModal}
                    showBtn = {address ? true : false}
                >
                {address ? ( 
                            <article>
                                <h5>{userFullName}</h5>
                                <p>{userAddress}</p>
                                <p>{userPhoneNumber}</p>
                            </article> 
                        ):(
                            <AddressForm />
                        )
                    }
                </CheckoutComponent>
                <CheckoutComponent title="2. Delivery Method"/>
                <CheckoutComponent title="3. Payment Method"/>
            </Checkout>
        </div>
    )
}

export default address
