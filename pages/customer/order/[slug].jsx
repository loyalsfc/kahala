import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import Head from 'next/head'
import { getSession } from 'next-auth/react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/router';

function OrderTracking({user, orders, params}) {
    const router = useRouter()
    const slug = router.query.slug
    const selectedOrder = orders.find(item => item.order_id === slug)
    console.log(selectedOrder)
    const {order_id, items, created_at, order_status} = selectedOrder
    console.log(items)
    return (
        <div>
            <Head>
                <title>Order Details</title>
            </Head>
            <AccountLayout title="Order">
                <section>
                    <h4>Order No: {order_id} </h4>
                    <article>
                        <p>{items.quantity} items</p>
                        <p>Placed on {new Date(created_at).toLocaleDateString()}</p>
                        <p>Total: ₦ {items.quantity * items.item.amount}</p>
                    </article>

                    <div>
                        <h4>ITEMS IN YOUR ORDER</h4>
                        <div>
                            <h6>{order_status}</h6>
                            <p>Delivered between Tuesday 08 August and Thursday 10 August</p>
                        </div>
                    </div>
                </section>
            </AccountLayout>
        </div>
    )
}

// export async function getStaticPaths(){
//     const {data} = await supabase.from('orders').select()
    
//     const paths = data.map(item => ({
//         params: {id: item.order_id}
//     }))

//     return {
//         paths,
//         fallback: false
//     }
     
// }

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


export default OrderTracking