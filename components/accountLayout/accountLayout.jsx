import React from 'react'
import HomeLayout from '../Layout/homeLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart, faMessage, faUser } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { faArrowLeft, faArrowLeftLong, faStore, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import Layout from '../Layout/layout'
import styles from './accountLayout.module.css'
import { signOut } from 'next-auth/react'
import AccountSideMenu from './accountSideMenu'
import Footer from '../footer/footer'
import Header from '../header/header'

function AccountLayout({title, children, showSideMenu}) {
    return (
            <div>
                <div className={styles.accountHeader}>
                    <Header />
                </div>
                <div className={styles.mobileTile}>
                    <Link href="/customer/account">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <span>{title}</span>
                </div>
                <Layout>
                    <main className={styles.main}>
                        <aside className={styles.aside}>
                            <AccountSideMenu />
                        </aside>
                        <section className={styles.section}>
                            <h2 className={styles.title}>{title}</h2>
                            <div className={styles.contentWrap}>
                                {children}
                            </div>
                        </section>
                    </main>
                </Layout>
                <Footer/>
            </div>
    )
}

export default AccountLayout
