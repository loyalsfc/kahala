import React, { useState } from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import Head from 'next/head'
import styles from './account.module.css'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Header from '../../../components/header/header'
import AccountSideMenu from '../../../components/accountLayout/accountSideMenu'
import Footer from '../../../components/footer/footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]'

function Index({user, address}) {
    const [defaultAddress, setDefaultIndex] = useState(address[0]?.address.find(item=>item.isDefault === true))

    return (
        <div>
            <Head>
                <title>My Kahala Account</title>
            </Head>
            <div className={styles.wrapper}>
                <AccountLayout title="Account Overview">
                    <section className={styles.section}>
                        <AccountItemWrap title="ACCOUNT DETAILS">
                            <h4>{user.name}</h4>
                            <p className={styles.text}>{user.email}</p>
                        </AccountItemWrap>
                        <AccountItemWrap title="ADDRESS BOOK">
                            <h4>Your default shipping address:</h4>
                            {address.length === 0 ? <p className={styles.text}>No default shipping address available.</p> :
                                <p className={styles.text}>
                                {defaultAddress.first_name} {defaultAddress.last_name} <br/>
                                {defaultAddress.delivery_address} <br/>
                                {defaultAddress.delivery_lga} {defaultAddress.delivery_state} <br/>
                                {defaultAddress.country_code + defaultAddress.phone_number}
                            </p>
                            }
                        </AccountItemWrap>
                        <AccountItemWrap title="KAHALA STORE CREDIT">
                            <span className={styles.storeCredit}>
                                <FontAwesomeIcon icon={faWallet}/> ₦0.00
                            </span>
                        </AccountItemWrap>
                        <AccountItemWrap title="NEWSLETTER PREFERENCES">
                            <h4>You are currently not subscribed to any of our newsletters.</h4>
                            <div className={styles.newsletter}>
                                <Link className='modifyBtn' href=''>EDIT NEWSLETTER PREFERENCES</Link>
                            </div>
                        </AccountItemWrap>
                    </section>
                </AccountLayout>
            </div>
            <div className={styles.mobileWrapper}>
                <Header />
                <div className={styles.mobileGreeting}>
                    <h3>Welcome {user?.name.split(" ")[0]}</h3>
                    <p>{user?.email}</p>
                </div>
                <div className={styles.wallet}>
                    <FontAwesomeIcon icon={faWallet} />
                    <span> ₦0.00</span>
                </div>
                <AccountSideMenu />
                <Footer />
            </div>
        </div>
    )
}

export function AccountItemWrap({title, children}){
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
    const session = await getServerSession(context.req, context.res, authOptions);

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
            address: address?.data
        }
    }
}

export default Index
