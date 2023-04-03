import React from 'react'
import styles from "./checkout.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function CheckoutComponent({title, children}) {
    return (
        <article className={styles.wrapper}>
            <h4 className={styles.heading}>
                <div className={styles.status}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <span>{title}</span>
                <button className={styles.changeBtn}>Change</button>
            </h4>
            <div className={styles.mainContent}>
                {children}
            </div>
        </article>
    )
}

export default CheckoutComponent
