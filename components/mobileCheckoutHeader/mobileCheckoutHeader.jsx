import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './mobileCheckoutHeader.module.css'

function MobileCheckoutHeader({text}) {
    return (
        <p className={styles.headerMobile}>
            <Link href="/cart">
                <FontAwesomeIcon icon={faArrowLeft} />
                {text}
            </Link>
        </p>
    )
}

export default MobileCheckoutHeader