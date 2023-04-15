import React, {useState} from 'react'
import Layout from '../../components/Layout/layout'
import { useSelector } from 'react-redux'
import AddressForm from '../../components/checkout/addressForm'
import Head from 'next/head'
import Checkout from '../../components/checkoutpage/checkouttemplate'
import CheckoutComponent from '../../components/checkout/checkoutComponent'
import DeliveryMethod from '../../components/checkout/deliveryMethod'
import AddAddressModal from '../../components/checkout/addAddressModal'
import PaymentMethod from '../../components/checkout/paymentMethod'

function Payment() {
    const [displayAddressModal, setDisplayAddressModal] = useState(false)
    const address = 'false';
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
                <title>Delivery Method | Kahala </title>
            </Head>
            <Layout>
                <Checkout>
                    {displayAddressModal && <AddAddressModal handleClick={closeModal} />}
                    <CheckoutComponent 
                        title="1. Address Details"
                        handleClick = {openAddressModal}
                        showBtn = {address ? true : false}
                    >
                    {address ? ( 
                                <article style={{padding: "1rem 3rem"}}>
                                    <h5>{userFullName}</h5>
                                    <p>{userAddress}</p>
                                    <p>{userPhoneNumber}</p>
                                </article> 
                            ):(
                                <AddressForm />
                            )
                        }
                    </CheckoutComponent>
                    <CheckoutComponent title="2. Delivery Method">
                        <article style={{padding: "1rem 3rem"}}>
                            <h5>Door Delivery</h5>
                            <p>Delivered between Thursday 13 Apr and Thursday 20 Apr for ₦ 3,000</p>
                            <p>{userPhoneNumber}</p>
                        </article> 
                    </CheckoutComponent>
                    <CheckoutComponent title="3. Payment Method">
                        <PaymentMethod />
                    </CheckoutComponent>
                </Checkout>
            </Layout>
        </div>
    )
}

export default Payment
