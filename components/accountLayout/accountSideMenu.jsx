import React from 'react'
import styles from './accountLayout.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faAngleRight, faStoreAlt, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { signOut } from 'next-auth/react'

function AccountSideMenu() {
    const {user} = useSelector(state => state.user)
    return (
        <>
            <nav className={styles.nav}>
                <h4 className={styles.sideTitle}>My Kahala Account</h4>
                <ul className={styles.itemList}>
                    <li>
                        <Link className={styles.links} href='/customer/account'>
                            <span><FontAwesomeIcon icon={faUser} /> My Kahala Account</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} href='/customer/order'>
                            <span><FontAwesomeIcon icon={faStoreAlt} /> Orders</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} href='/customer/inbox'>
                            <span><FontAwesomeIcon icon={faEnvelope} /> Inbox</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} href='/customer/voucher'>
                            <span><FontAwesomeIcon icon={faVrCardboard} /> Voucher</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} href='/customer/saves'>
                            <span><FontAwesomeIcon icon={faHeart} /> Saves</span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
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
