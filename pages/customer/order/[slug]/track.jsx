import Head from 'next/head'
import React from 'react'
import AccountLayout from '../../../../components/accountLayout/accountLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import style from './track.module.css'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../lib/supabaseClient'

function Track({orders}) {
    const router = useRouter();
    const slug = router.query.slug;
    const selectedOrder = orders.find(item => item.order_id === slug);
    console.log(selectedOrder)
    const {created_at, order_status} = selectedOrder
    
    function dateLocale(date){
        return `${date.toLocaleDateString("en", {day: "numeric"}).padStart("2", "0")} - ${date.toLocaleDateString("en", {month: "numeric"}).padStart("2", "0")}`
    }

    function calculateDeliveryDate(extendedDate){
        const date = new Date(created_at)
        const expectedDeliveryDate = new Date(date.setDate(date.getDate() + extendedDate))
        return `${expectedDeliveryDate.toLocaleDateString("en", {day: "numeric"}).padStart("2", "0")} - ${expectedDeliveryDate.toLocaleDateString("en", {month: "numeric"}).padStart("2", "0")}`
    }

    return (
        <div>
            <Head>
                <title>Order Tracking</title>
            </Head>
            <AccountLayout title="Track Order">
                <section className={style.container}>
                    <div>
                        <Status text="Order Placed" color="color" bgColor="bg-color" date={dateLocale(new Date(created_at)).replace("/", " - ")} />
                        <Status text="Pending Confirmation" color="color" bgColor="bg-color" date={dateLocale(new Date(created_at)).replace("/", " - ")} />
                        <Status text="Waiting to be Shipped" color="color" bgColor="bg-color" date={dateLocale(new Date(created_at)).replace("/", " - ")} />
                        {order_status !== "placed" && <Status text="Shipped" color="color" bgColor="bg-color" date={calculateDeliveryDate(1)} />}
                        {order_status === "Delivered" && <Status text="Delivered" color="delivered-color" bgColor="delivered-bg-color" date={calculateDeliveryDate(6)} />}
                    </div>
                    {order_status === "Delivered" && <span className={style.delivery_note}>Your item/order has been delivered.</span>}
                </section>
            </AccountLayout>
        </div>
    )
}

function Status({text, date, color, bgColor}){
    return (
        <div className={style.status_wrapper}>
            <div className={style.status_header}>
                <div className={`${style.status_checked} ${style[color]}`}><FontAwesomeIcon icon={faCheckCircle} /></div>
                <span className={`${style.status_text} ${style[bgColor]}`}>{text}</span>
            </div>
            <div className={style.status_footer}>
                <span className={style.status_date}>{date}</span>
            </div>
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


export default Track