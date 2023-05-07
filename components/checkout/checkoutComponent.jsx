import React from 'react'
import styles from "./checkout.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function CheckoutComponent({title, children, linkTo, showBtn}) {
    return (
        <article className={styles.wrapper}>
            <h4 className={styles.heading}>
                <div style={{backgroundColor: showBtn ? '#6DBB28' : null}} className={styles.status}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <span>{title}</span>
                {showBtn &&  
                    <button  className={styles.changeBtn}>
                        <Link href={linkTo}>
                            Change
                        </Link>
                    </button>
                }
            </h4>
            <div className={styles.mainContent}>
                {children}
            </div>
        </article>
    )
}

export default CheckoutComponent
