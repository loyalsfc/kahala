import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import Head from 'next/head'
import styles from './account.module.css'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function Index({user, address}) {
    const defaultAddress = address.find(item=>item.isDefault === true);
    const {first_name, last_name, country_code, delivery_address, delivery_lga, delivery_state, phone_number} = defaultAddress;
    console.log(defaultAddress);
    return (
        <div>
            <Head>
                <title>My Kahala Account</title>
            </Head>
            <AccountLayout title="Account Overview">
                <section className={styles.section}>
                    <AccountItemWrap title="ACCOUNT DETAILS">
                        <h4>{user.name}</h4>
                        <p className={styles.text}>{user.email}</p>
                    </AccountItemWrap>
                    <AccountItemWrap title="ADDRESS BOOK">
                        <h4>Your default shipping address:</h4>
                        <p className={styles.text}>
                            {first_name} {last_name} <br/>
                            {delivery_address} <br/>
                            {delivery_lga} {delivery_state} <br/>
                            {country_code + phone_number}
                        </p>
                    </AccountItemWrap>
                    <AccountItemWrap title="KAHALA STORE CREDIT">
                        <span className={styles.storeCredit}>
                            <FontAwesomeIcon icon={faWallet}/> ₦0.00
                        </span>
                    </AccountItemWrap>
                    <AccountItemWrap title="NEWSLETTER PREFERENCES">
                        <h4>You are currently not subscribed to any of our newsletters.</h4>
                        <div className={styles.newsletter}>
                            <Link className='modifyBtn' href='/customer/newsletter'>EDIT NEWSLETTER PREFERENCES</Link>
                        </div>
                    </AccountItemWrap>
                </section>
            </AccountLayout>
        </div>
    )
}

function AccountItemWrap({title, children}){
    return(
        <article className={styles.itemContainer}>
            <div className={styles.itemWrap}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </article>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context);

    if(!session){
        return {
            redirect: {
                destination: "/auth",
                parmanent: false
            }
        }
    }

    const address = await supabase.from('user').select('address').eq('user_id', session.user.email)

    return{
        props: {
            user: session.user,
            address: address?.data[0]?.address
        }
    }
}

export default Index
