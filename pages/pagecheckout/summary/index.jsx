import Head from 'next/head'
import React, { useRef, useState } from 'react'
import Checkout from '../../../components/checkoutpage/checkouttemplate'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import CheckoutComponent from '../../../components/checkout/checkoutComponent'
import AddressPreview from '../../../components/addressPreview/addressPreview'
import DeliveryPreview from '../../../components/deliveryPreview/deliveryPreview'
import ShipmentDetails from '../../../components/shipmentDetails/shipmentDetails'
import styles from './summary.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import MobileCheckoutHeader from '../../../components/mobileCheckoutHeader/mobileCheckoutHeader'
import OrderSummary from '../../../components/orderSummary/orderSummary'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import { initCart } from '../../../store/cartSlice'
import { PaystackButton } from 'react-paystack'
import { calculateDeliveryFee } from '../../../utils/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]'


function Summary({deliveryDetails, user}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const {address, delivery_method, payment_method} = deliveryDetails 
    const [showModal, setShowModal] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const {cart} = useSelector(state => state.cart)
    const {totalProducts, totalPrice, products} = cart; 
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    const {country_code, phone_number} = address[0]
    const amount = (totalPrice + calculateDeliveryFee(delivery_method, totalProducts)) * 100;
    
    function paymentMethodNote(){
        if(payment_method == "pay-on-delivery"){
            return "With Cash, Bank Transfers or Cards."
        } else if(payment_method == "card-payment"){
            return "You will be redirected to our secure checkout page"
        }
    }

    async function validateOrder(paidStatus){
        setShowModal(false)
        setShowLoader(true);
        const generalId = uuidv4()
        let orders = products.map(product => {
            const orderId = uuidv4();
            return {
                user_id: user?.email,
                is_paid: paidStatus,
                delivery_method,
                delivery_address: delivery_method == 'door' ?  address.find(item => item.isDefault == true) : {delivery_method},
                items: product,
                order_id: orderId
            }
        })
        const {data, error} = await supabase.from('orders')
            .insert(orders)
            .select()
        if(data){
            products.forEach(async (item) =>{
                const { error } = await supabase
                    .from('cart')
                    .delete()
                    .eq('id', item.id)
            })
            dispatch(initCart([]))
            router.push(`/ordercomplete/${generalId}`)
        }
    }

    const componentProps = {
        email: user?.email,
        amount,
        metadata: {
            name: user?.name,
            phone: country_code + phone_number,
        },
        publicKey,
        text: "Yes",
        onSuccess: () =>{
            validateOrder(true)
        },
        onClose: () => setShowModal(false),
      }

    return (
        <div style={{position: "relative"}}>
            <Head>
                <title>Summary</title>
            </Head>
            {showModal &&
                <div className='confirmationWrapper'>
                    <article className={styles.confirmationContent}>
                        <p>Confirm Order</p>
                        <div className={styles.buttonWrap}>
                            {payment_method === "pay-on-delivery" ?
                                <button onClick={()=>validateOrder(false)} className={styles.confirmOrder}>Yes</button>:
                                <PaystackButton className={styles.confirmOrder} {...componentProps}/>
                            }
                            <button onClick={()=>setShowModal(false)} className={styles.cancelOrder}>No</button>
                        </div>
                    </article>
                </div>
            }
            {showLoader &&
                <div className='confirmationWrapper'>
                    <article className={styles.loaderWrapper}>
                        <div className={`${styles.loader} animation`}></div>
                    </article>
                </div>
            }
            <MobileCheckoutHeader text='Select payment' />
            <Checkout 
                deliveryMethod = {delivery_method}
                isPaymentPage={true} 
                isSummaryPage = {true}
                confirmOrder={()=>setShowModal(true)}
            >   
                <p className={styles.acceptClass}>By proceeding, you are automatically accepting the terms & conditions</p>
                <section className={styles.section}>
                    <OrderSummary
                        deliveryMethod = {delivery_method}
                        isPaymentPage={true} 
                        isSummaryPage = {true}
                    />
                </section>
                <div className={styles.wrapper}>
                    <CheckoutComponent
                        title="DELIVERY ADDRESS"
                        linkTo = "/pagecheckout/address"
                        showBtn = {true}
                    >
                        <AddressPreview address={address} />
                    </CheckoutComponent>
                    <CheckoutComponent
                        title="DELIVERY METHOD"
                        linkTo = "/pagecheckout/delivery"
                        showBtn = {true}
                    >
                        <DeliveryPreview deliveryMethod={delivery_method} />
                        <div className={styles.shipmentDetailsWrap}>
                            <ShipmentDetails/>
                            <div className='modifyBtnWrapper'>
                                <Link href="/cart" className='modifyBtn'>Modify Cart</Link>
                            </div>
                        </div>
                    </CheckoutComponent>
                    <CheckoutComponent
                        title="PAYMENT METHOD"
                        linkTo="/pagecheckout/payment"
                        showBtn={true}
                    >
                        <article className={styles.paymentSummary}>
                            <div>
                                <h5 className={styles.titleCase}>{payment_method.replace('-', " ")}</h5>
                                <p>{paymentMethodNote()}</p>
                            </div>
                            <FontAwesomeIcon 
                                icon={payment_method == "pay-on-delivery" ? faHandHoldingDollar : faShieldAlt} 
                                color={payment_method == "pay-on-delivery" ? "#F68B1E" : "#4c90e2"}
                            />
                        </article>
                    </CheckoutComponent>
                </div>
            </Checkout>
            <div className={styles.confirmMobileBtnWrapper}>
                <button onClick={()=>setShowModal(true)} className={styles.confirmMobileBtn}>CONFIRM ORDER</button>
            </div>
        </div>
    ) 
}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions)

    if(!session){
        return {
            redirect: {
                destination: "/auth",
                parmanent: false
            }
        }
    }

    const {data: deliveryDetails} = await supabase
        .from('user')
        .select()
        .eq('user_id', session?.user?.email)


    if(!deliveryDetails.length){
        return{
            redirect: {
                destination: "/pagecheckout/address",
                parmanent: false
            }
        }
    }
    
    if(!deliveryDetails[0].delivery_method){
        return{
            redirect: {
                destination: "/pagecheckout/delivery",
                parmanent: false
            }
        }
    }

    if(!deliveryDetails[0].payment_method){
        return{
            redirect: {
                destination: "/pagecheckout/payment",
                parmanent: false
            }
        }
    }



    return {
        props: {user: session.user, deliveryDetails: deliveryDetails[0]}
    }
}

export default Summary
