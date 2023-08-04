import Head from 'next/head'
import React, { useState } from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import styles from './address.module.css'
import { changeDefaultAddress } from '../../../utils/utils'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]'

function Index({address}) {
    const router = useRouter()
    
    async function handleClick(index){
        await changeDefaultAddress(index, address[0].address, address[0].id);
        router.reload()
    }

    return (
        <div>
            <Head>
                <title>Address Book</title>
            </Head>
            <AccountLayout title={`Addresses ${address.length ? `(${address[0].address.length})` : ""}`}>
                {address.length ? (
                    <section>
                        <ul className={styles.addressGrid}>
                            {address[0].address.map((item, index)=>{
                                    const {isDefault, first_name, last_name, country_code, delivery_address, delivery_lga, delivery_state, phone_number} = item;

                                    return(
                                        <li key={index} className={styles.addressContainer}>
                                            <article className={styles.addressWrapper }>
                                                <address style={{backgroundColor: isDefault ? "#FEF3E9" : null}} className={styles.address}>
                                                    <h2 className={styles.addressName}>{first_name} {last_name}</h2>
                                                    <p>{delivery_address}</p>
                                                    <p>{delivery_lga} {delivery_state}</p>
                                                    <p className={styles.addressNumber}>{country_code + phone_number}</p>
                                                    {isDefault && <span className={styles.defaultAddress}>Default Address</span>}
                                                </address>
                                                <footer className={styles.addressFooter}>
                                                    <button onClick={()=>handleClick(index)} disabled={isDefault ? true : false} className="modifyBtn">set as default</button>
                                                    <button onClick={()=>handleClick(index)} className={`modifyBtn ${styles.editBtn}`}><FontAwesomeIcon icon={faPen}/></button>
                                                    <button onClick={()=>handleClick(index)} className={`modifyBtn ${styles.trashBtn}`}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                                </footer>
                                            </article>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                ):(
                    <EmptyAccount
                        showLink={true}
                        link="/images/empty-address.svg"
                        title="You have not added any address yet!"
                        content="Add your shipping addresses here for a fast purchase experience! You will be able to add, modify or delete them at any time."
                    />
                )
                }
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

    const {data: address} = await supabase.from('user')
        .select()
        .eq('user_id', session?.user?.email)

    return {
        props: {address}
    }
}

export default Index
