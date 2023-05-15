import React from 'react'
import HomeLayout from '../Layout/homeLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart, faMessage, faUser } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { faStore, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import Layout from '../Layout/layout'
import styles from './accountLayout.module.css'
import { signOut } from 'next-auth/react'

function AccountLayout({title, children}) {
    return (
            <HomeLayout>
                <Layout>
                    <main className={styles.main}>
                        <aside className={styles.aside}>
                            <nav className={styles.nav}>
                                <ul>
                                    <li className={styles.links}>
                                        <Link href='/customer/account'>
                                            <FontAwesomeIcon icon={faUser} /> My Kahala Account
                                        </Link>
                                    </li>
                                    <li className={styles.links}>
                                        <Link href='/customer/order'>
                                            <FontAwesomeIcon icon={faStore} /> Orders
                                        </Link>
                                    </li>
                                    <li className={styles.links}>
                                        <Link href='/customer/inbox'>
                                            <FontAwesomeIcon icon={faEnvelope} /> Inbox
                                        </Link>
                                    </li>
                                    <li className={styles.links}>
                                        <Link href='/customer/voucher'>
                                            <FontAwesomeIcon icon={faVrCardboard} /> Voucher
                                        </Link>
                                    </li>
                                    <li className={styles.links}>
                                        <Link href='/customer/saves'>
                                            <FontAwesomeIcon icon={faHeart} /> Saves
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li className={`${styles.links} border-top`}>
                                        <Link href='/customer/account'>Account Management</Link>
                                    </li>
                                    <li className={styles.links}>
                                        <Link href='/customer/address'>Address Book</Link>
                                    </li>
                                    <li className={styles.links}></li>
                                </ul>
                                <div className='modifyBtnWrapper border-top'>
                                    <button className='modifyBtn' onClick={()=>signOut()}>Logout</button>
                                </div>
                            </nav>
                        </aside>
                        <section className={styles.section}>
                            <h2 className={styles.title}>{title}</h2>
                            <div className={styles.contentWrap}>
                                {children}
                            </div>
                        </section>
                    </main>
                </Layout>
            </HomeLayout>
    )
}

export default AccountLayout
