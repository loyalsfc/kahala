import Head from 'next/head'
import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import Image from 'next/image'
import { calculateDiscountedAmount, priceConverion, urlFor } from '../../../utils/utils'
import styles from './saves.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

function Index({saves}) {
    
    return (
        <div>
            <Head>
                <title>Saves</title>
            </Head>
            <AccountLayout title='saves'>
                {saves.length ? (
                    <ul>
                        {
                            saves.map(item => {
                                return (
                                    <li key={item.id} className={styles.saveWrapper}>
                                        <article className={styles.saves}>
                                            <Image
                                                src={urlFor(item.item.images[0].asset._ref).url(    )}
                                                height={104}
                                                width={104}
                                                alt={item.item.title}
                                            />
                                            <div className={styles.titleContainer}>
                                                <h2 className={styles.title}>{item.item.title}</h2>
                                                <p>₦ {priceConverion(item.item.amount)}</p>
                                                {item.item.discount !==0 && 
                                                    <p className={styles.discountWrapper}>
                                                        <span className={styles.discount}>₦ {calculateDiscountedAmount(item.item.amount, item.item.discount)}</span> 
                                                        <span className={styles.percentageSlash}>-{item.item.discount}%</span>
                                                    </p>
                                                }
                                            </div>
                                            <div className={styles.btnWrapper}>
                                                <button className={styles.confirmBtn}>Buy now</button>
                                                <button className="modifyBtn">
                                                    <FontAwesomeIcon icon={faTrashAlt} /> Remove
                                                </button>
                                            </div>
                                        </article>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ):(
                    <EmptyAccount
                        showLink={true}
                        link="/images/empty-save.svg"
                        title="You haven’t saved an item yet!"
                        content="Found something you like? Tap on the heart shaped icon next to the item to add it to your wishlist! All your saved items will appear here."
                    />
                )}
            </AccountLayout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)

    if(!session){
        return {
            redirect: {
                destination: "/auth",
                parmanent: false
            }
        }
    }

    const {data: saves} = await supabase.from('saves').select().eq('user_id', session?.user?.email)

    return {
        props: {user: session, saves }
    }
}

export default Index
