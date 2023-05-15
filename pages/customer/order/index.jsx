import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import styles from './order.module.css'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import Image from 'next/image'
import { urlFor } from '../../../utils/utils'
import Link from 'next/link'
import Head from 'next/head'

function Index({user, orders}){
    const {items, created_at} = orders[0]
    console.log(new Date(created_at).toLocaleDateString().replaceAll('/', '-'))

    return (
        <div>
            <Head>
                <title>Orders</title>
            </Head>
            <AccountLayout title="Order">
                <h3 className={styles.title}>
                    <span>Open Orders ({items.products.length})</span>
                </h3>
                <section>
                    <ul>
                        {
                            items.products.map(items=>{
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
                                                <span>On {new Date(created_at).toLocaleDateString().replaceAll('/', '-')}</span>
                                            </div>
                                            <Link className={styles.details} href=''>See Details</Link>
                                        </article>
                                    </li>
                                )
                            })
                        }
                    </ul>
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
