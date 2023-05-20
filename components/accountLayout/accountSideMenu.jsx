import React from 'react'
import styles from './accountLayout.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faAngleRight, faStoreAlt, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

function AccountSideMenu() {
    const {user} = useSelector(state => state.user)
    return (
        <>
            <nav className={styles.nav}>
                <h4 className={styles.sideTitle}>My Kahala Account</h4>
                <ul className={styles.itemList}>
                    <li className={styles.links}>
                        <Link href='/customer/account'>
                            <FontAwesomeIcon icon={faUser} /> My Kahala Account
                        </Link>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                    <li className={styles.links}>
                        <Link href='/customer/order'>
                            <FontAwesomeIcon icon={faStoreAlt} /> Orders
                        </Link>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                    <li className={styles.links}>
                        <Link href='/customer/inbox'>
                            <FontAwesomeIcon icon={faEnvelope} /> Inbox
                        </Link>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                    <li className={styles.links}>
                        <Link href='/customer/voucher'>
                            <FontAwesomeIcon icon={faVrCardboard} /> Voucher
                        </Link>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                    <li className={styles.links}>
                        <Link href='/customer/saves'>
                            <FontAwesomeIcon icon={faHeart} /> Saves
                        </Link>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                </ul>
                <h4 className={styles.sideTitle}>Account Settings</h4>
                <ul className={styles.itemList}>
                    <li className={`${styles.links} border-top`}>
                        <Link href='/customer/account'>Account Management</Link>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                    <li className={styles.links}>
                        <Link href='/customer/address'>Address Book</Link>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                    <li className={styles.links}></li>
                </ul>
                <div className='modifyBtnWrapper border-top'>
                    <button className='modifyBtn' onClick={()=>signOut()}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default AccountSideMenu
