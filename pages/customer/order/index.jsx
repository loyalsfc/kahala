import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import styles from './order.module.css'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import Image from 'next/image'
import { urlFor } from '../../../utils/utils'
import Link from 'next/link'
import Head from 'next/head'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'

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
                                    orders[0].items.products.map(items=>{
                                        return(
                                            <li className={styles.productItemsWrap} key={items.id}>
                                                <article className={styles.productItems}>
                                                    <div className={styles.imageWrap}>
                                                        <Image
                                                            src={urlFor(items.item.images[0].asset._ref).url()}
                                                            height={104}
                                                            width={104}
                                                            alt='Lol'
                                                        />
                                                    </div>
                                                    <div className={styles.productTitle}>
                                                        <h4>{items.item.title}</h4>
                                                        <span className={styles.shipped}>Shipped</span>
                                                        <span>On {new Date(orders[0].created_at).toLocaleDateString().replaceAll('/', '-')}</span>
                                                    </div>
                                                    <Link className={styles.details} href=''>See Details</Link>
                                                </article>
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
    const session = await getSession(context);

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

export default Index
