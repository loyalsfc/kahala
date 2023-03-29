import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './deliveryDetails.module.css'

function DeliveryDetails({icon, heading, text}) {
  return (
    <div className={styles.wrapper}>
        <div><FontAwesomeIcon icon={icon} size="xl" /></div>
        <article>
            <h6>{heading}</h6>
            <p>{text}</p>
        </article>
    </div>
  )
}

export default DeliveryDetails
