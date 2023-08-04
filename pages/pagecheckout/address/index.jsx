import { getSession } from 'next-auth/react';
import React, { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient';
import Head from 'next/head';
import AddressCheckout from '../../../components/addressCheckout/addressCheckout';
import styles from './create.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { changeDefaultAddress } from '../../../utils/utils';
import { getServerSession } from 'next-auth';

function Index({address}) {
    const router = useRouter()
    const {address: addressLists, id} = address;
    const [defaultIndex, setDefaultIndex] = useState(null)

    const handleChange = (index) => {
        setDefaultIndex(index);
    }

    const handleClick = async() => {
        await changeDefaultAddress(defaultIndex, addressLists, id)
        router.push('/pagecheckout/summary')
    }
    return (
        <div>
            <Head>
                <title>Address Book </title>
            </Head>
            <AddressCheckout title="Select delivery address">
                <div className={styles.container}>
                    <ul className={styles.addressesWrapper}>
                        {
                            addressLists.map((address, index) => {
                                const{country_code, delivery_address, delivery_lga, delivery_state, first_name, last_name, phone_number, isDefault } = address
                                return (
                                    <li key={index} className={styles.addressContainer}>
                                        <div className={styles.addressDetails}>
                                            <input defaultChecked={isDefault ? true : false} type="radio" onChange={()=>handleChange(index)} name="selected-address" id={`item-${index}`} />
                                            <div>
                                                <label className={styles.addressName} htmlFor={`item-${index}`}>{first_name} {last_name}</label>
                                                <p className={styles.addressContacts}>
                                                    <span>{delivery_address} | {delivery_lga} - {delivery_state}</span> <br/>
                                                    <span>{country_code + phone_number}</span>
                                                </p>
                                                {isDefault && <p className={styles.defaultTag}>default address</p>}
                                            </div>
                                            <div className={styles.addressDetailsBtnWrapper}>
                                                <button className={styles.addressDetailsBtn}><span>Edit</span> <FontAwesomeIcon icon={faPen} /></button>
                                                {/* <button className={styles.addressDetailsBtn}>Delete <FontAwesomeIcon icon={faTrashAlt} /></button> */}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <Link className={styles.createBtnDesktop} href='address/create'>
                        <button className={styles.createBtn}>
                            <FontAwesomeIcon icon={faPlus} />
                            ADD ADDRESS
                        </button>
                    </Link>
                </div>
                <div className={styles.btnContainer}>
                    <span>Cancel</span>
                    <button onClick={handleClick} className={styles.selectAddress}>
                        SELECT ADDRESS
                    </button>
                </div>
                <div className={styles.mobileContainer}>
                        <button onClick={handleClick} className={styles.selectAddressMobile}>
                            Select Address
                        </button>
                        <Link className={styles.createAddressMobile} href='address/create'>
                            <button className={styles.createAddressMobile}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </Link>
                </div>
            </AddressCheckout>
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

    const {data: address} = await supabase.from('user').select().eq('user_id', session?.user?.email)

    if(!address.length){
        return{
            redirect:{
                destination: '/pagecheckout/address/create',
                parmanent: false
            }
        }
    }

    return {
        props: {user: session,address: address[0]}
    } 
}


export default Index
