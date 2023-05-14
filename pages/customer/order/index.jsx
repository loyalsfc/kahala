import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import styles from './order.module.css'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'

function Index({user, orders}){
    console.log(user, orders)
    return (
        <div>
            <AccountLayout title="Order">
                <h3 className={styles.title}>
                    <span>Open Orders (0)</span>
                </h3>
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

    const orders = await supabase.from('order').select()


    return{
        props: {user: session.user, orders}
    }
}

export default Index
