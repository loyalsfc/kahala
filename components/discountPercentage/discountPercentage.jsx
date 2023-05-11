import React from 'react'
import styles from './discountPercentage.module.css'

function DiscountPercentage({discount}) {
    return (
        <span className={styles.discountedPercentage}>-{discount}%</span>
    )
}

export default DiscountPercentage
