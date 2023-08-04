import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import styles from './order.module.css'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import Image from 'next/image'
import { calculateDeliveryDate, urlFor } from '../../../utils/utils'
import Link from 'next/link'
import Head from 'next/head'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'
import { getServerSession } from 'next-auth'

function Index({user, orders}){
    console.log(orders)

    return (
        <div>
            <Head>
                <title>Orders</title>
            </Head>
            <AccountLayout title="Order">
                <h3 className={styles.title}>
                    {/* <span>Open Orders ({orders[0].items.products.length})</span> */}
                </h3>
                <section>
                    {orders.length === 0 ? 
                        <EmptyAccount
                            showLink={true}
                            link="/images/empty-orders.svg"
                            title="You have placed no orders yet!"
                            content="All your orders will be saved here for you to access their state anytime."
                        /> : (
                            <ul>
                                {
                                    orders.map(item=>{
                                        return(
                                            <li className={styles.productItemsWrap} key={item.id}>
                                                <Link href={`/customer/order/${item.order_id}`}>
                                                    <div className={styles.productItems}>
                                                        <div className={styles.imageWrap}>
                                                            <Image
                                                                src={urlFor(item.items.item.images[0].asset._ref)?.url()}
                                                                height={104}
                                                                width={104}
                                                                alt='Lol'
                                                            />
                                                        </div>
                                                        <div className={styles.productTitle}>
                                                            <h4>{item.items.item.title}</h4>
                                                            <span className={styles.orderTitle}>Order {item.order_id}</span>
                                                            <span 
                                                                className={styles.shipped}
                                                                style={{backgroundColor: item.order_status === "Delivered" && "#6dbd28"}}
                                                            >
                                                                {item.order_status}
                                                            </span>
                                                            {item.order_status === "Delivered" ? <span>On {new Date(item.created_at).toLocaleDateString().replaceAll('/', '-')}</span>:(
                                                                <span>Delivered between {calculateDeliveryDate(new Date(item.created_at), "and")}</span>
                                                            )}
                                                        </div>
                                                        <Link className={styles.details} href={`/customer/order/${item.order_id}`}>See Details</Link>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
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

    const {data} = await supabase.from('orders').select().eq('user_id', session?.user?.email).order('id', { ascending: false })





    return{
        props: {user: session.user, orders: data}
    }
}

export default Index
