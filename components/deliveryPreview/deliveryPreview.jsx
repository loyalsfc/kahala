import React from 'react'
import styles from '../addressPreview/addressPreview.module.css'

function DeliveryPreview({deliveryMethod}) {
    const currentDate = new Date();
    const expectedDeliveryDateStart = new Date(currentDate.setDate(currentDate.getDate() + 5))
    const expectedDeliveryDateEnd = new Date(currentDate.setDate(currentDate.getDate() + 2))

    function getDate(date){
        return `${date.toLocaleDateString("en", {day: 'numeric', month: "short"})}`
    }
    return (
        <article className={styles.article}>
            <h5>{deliveryMethod == 'door' ? "Door Delivery" : "Pickup Station"}</h5>
            <p>Delivery beween <strong>{getDate(expectedDeliveryDateStart)}</strong> and <strong>{getDate(expectedDeliveryDateEnd)}</strong></p>
        </article> 
    )
}

export default DeliveryPreview
