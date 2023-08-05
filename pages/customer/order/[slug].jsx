import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import Head from 'next/head'
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/router';
import { calculateDeliveryDate, calculateDeliveryFee, calculateDiscountedAmount, urlFor } from '../../../utils/utils';
import Image from 'next/image';
import { AccountItemWrap } from '../account';
import styles from './orderdetails.module.css'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';

function OrderTracking({user, orders, params}) {
    const router = useRouter()
    const slug = router.query.slug
    const selectedOrder = orders.find(item => item.order_id === slug)
    const {order_id, items, created_at, order_status, delivery_method, delivery_address} = selectedOrder
    return (
        <div>
            <Head>
                <title>Order Details</title>
            </Head>
            <AccountLayout title="Order">
                <section>
                    <div className={styles.info_wrap}>
                        <h4 className={styles.title}>Order No: {order_id} </h4>
                        <article className={styles.title_summary}>
                            <p>{items.quantity} items</p>
                            <p>Placed on {new Date(created_at).toLocaleDateString()}</p>
                            <p>Total: ₦ {(items?.quantity * items?.item.amount).toLocaleString()}</p>
                        </article>
                    </div>

                    <div className={styles.product_info}>
                        <h4 className={styles.title}>ITEMS IN YOUR ORDER</h4>
                        <div className={styles.product_details_wrapper}>
                            <div className={styles.product_info_container}>
                                <span 
                                    className={styles.order_status}
                                    style={{backgroundColor: order_status === "Delivered" && "#6dbd28"}}
                                >
                                    {order_status === "placed" ? "Waiting to be shipped" : order_status}
                                </span>
                                <h5 className={styles.delivery_note}>Delivered between {calculateDeliveryDate(new Date(created_at), "and")}</h5>
                                <article className={styles.product_details}>
                                    <Image
                                        src={urlFor(items?.item?.images[0].asset._ref).url()}
                                        height={104}
                                        width={104}
                                        alt='Image'
                                    />
                                    <div className={styles.product_details_text}>
                                        <Link className={styles.product_title} href={`/category/product/${items.item?.slug?.current}`}>{items?.item?.title}</Link>
                                        <span>Qty: {items?.quantity}</span>
                                        <p >₦{items?.item.amount.toLocaleString()} <span>₦{calculateDiscountedAmount(items?.item.amount, items?.item?.discount)}</span></p>
                                    </div>
                                </article>
                            </div>
                            <div className={styles.button_wrapper}>
                                {order_status !== "Delivered" ?  <>
                                    {order_status === "placed" && <button className={styles.modify_btn}>CANCEL ITEM</button>}
                                    <Link className={styles.modify_btn} href={`/customer/order/${slug}/track`}>TRACK MY ITEM</Link>
                                </>:<Link className='modifyBtn' href={`/customer/order/${slug}/track`}>SEE STATUS HISTORY</Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.order_information}>
                        <AccountItemWrap title="PAYMENT INFORMATION">
                            <div className='pb-4'>
                                <h5 className={styles.title}>Payment Method</h5>
                                <p className={styles.content}>Pay with Cards, Bank Transfer or USSD</p>
                            </div>

                            <div className='pb-4'>
                                <h5 className={styles.title}>Payment Details</h5>
                                <p className={styles.content}>Item total: ₦ {(items?.quantity * items?.item.amount).toLocaleString()}</p>
                                <p className={styles.content}>Delivery Fees: ₦ {calculateDeliveryFee(delivery_method, items?.quantity).toLocaleString()}</p>
                                <p className={styles.content}>Total: ₦ {((items?.quantity * items?.item.amount) + calculateDeliveryFee(delivery_method, items?.quantity)).toLocaleString()}</p>
                            </div>
                        </AccountItemWrap>
                        <AccountItemWrap title="DELIVERY INFORMATION">
                            <div className='pb-4'>
                                <h5 className={styles.title}>Delivery Method</h5>
                                <p className={styles.content}>{delivery_method === "door" ? "Door Delivery" : "Pick-up Station"}</p>
                            </div>
                            
                            <div className='pb-4'>
                                <h5 className={styles.title}>{delivery_method === "door" ? "Shipping Address" : "Pick-up Station Address"}</h5>
                                {delivery_method === "door" ?<div>
                                    <p className={styles.content}>{delivery_address.first_name} {delivery_address.last_name}</p>
                                    <p className={styles.content}>{delivery_address.delivery_address} {delivery_address.delivery_lga} {delivery_address.delivery_state}</p>
                                </div>:<div>
                                    <p className={styles.content}>Ikeja Two Station</p>
                                    <p className={styles.content}>Lagos State Housing Estate Phase 1 Gate by Vigilante Group of Nigeria office</p>
                                    <p className={styles.content}>Ikeja, Lagos</p>
                                    <h6>Opening Hours:</h6>
                                    <p className={styles.content}>MON- FRI 8am - 7pm ; SAT - 8am- 7pm</p>
                                </div>}
                            </div>
                            <div className='pb-4'>
                                <h5 className={styles.title}>Shipping Details</h5>
                                <p className={styles.content}>{delivery_method === "door" ? "Door Delivery" : "Pick-up Station"}. Fulfilled by {items?.item?.brand}</p>
                                <p className={styles.content}>Delivery between {calculateDeliveryDate(new Date(created_at), "and")}</p>
                            </div>
                        </AccountItemWrap>
                    </div>
                </section>
            </AccountLayout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions);

    if(!session){
        return{
            redirect: {
                destination: '/auth',
                parmanent: false
            }
        }
    }

    const {data} = await supabase.from('orders').select().eq('user_id', session?.user?.email)


    return{
        props: {user: session.user, orders: data}
    }
}


export default OrderTracking