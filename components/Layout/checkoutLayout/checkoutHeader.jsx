import React from 'react'
import Layout from '../layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faRotate, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import styles from './checkoutHeader.module.css'
import Link from 'next/link'

function CheckoutHeader() {
    return (
        <header className={styles.header}>
            <Layout>
                <div className={styles.headerItemsWrapper}>
                    <Link href="/">
                        <h1 className={styles.logo}>Kahala <span>Store</span></h1>
                    </Link>
                    <div className={`${styles.headerInfo} ${styles.mlAuto}`}>
                        <FontAwesomeIcon icon={faPhone} size='sm' />
                        <span>
                            Need Help? <br/>
                            Please fill the contact us form
                        </span>
                    </div>
                    <div className={styles.headerInfo}>
                        <FontAwesomeIcon icon={faShieldHalved} size='sm' />
                        <span>
                            Secure <br/>Payment
                        </span>
                    </div>
                    <div className={styles.headerInfo}>
                        <FontAwesomeIcon icon={faRotate} size='sm' />
                        <span>
                            Easy Return
                        </span>
                    </div>
                </div>
            </Layout>
        </header>
    )
}

export default CheckoutHeader
