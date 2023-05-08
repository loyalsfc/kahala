import React from 'react'

function DeliveryPreview({deliveryMethod}) {
    const currentDate = new Date();
    const expectedDeliveryDateStart = new Date(currentDate.setDate(currentDate.getDate() + 5))
    const expectedDeliveryDateEnd = new Date(currentDate.setDate(currentDate.getDate() + 2))

    function getDate(date){
        return `${date.toLocaleDateString("en", {day: 'numeric', month: "short"})}`
    }
    return (
        <article style={{padding: "1rem 3rem"}}>
            <h5>{deliveryMethod == 'door' ? "Door Delivery" : "Pickup Station"}</h5>
            <p>Delivery beween <strong>{getDate(expectedDeliveryDateStart)}</strong> and <strong>{getDate(expectedDeliveryDateEnd)}</strong></p>
        </article> 
    )
}

export default DeliveryPreview
