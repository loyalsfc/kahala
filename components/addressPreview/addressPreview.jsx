import React from 'react'

function AddressPreview({address}) {
    const {country_code, 
        phone_number, 
        first_name, 
        last_name,
        delivery_address,
        delivery_lga, 
        delivery_state} = address.find(item => item.isDefault == true)

    return (
        <article style={{padding: "1rem 3rem"}}>
            <h5>{first_name} {last_name}</h5>
            <p>{delivery_address} | {delivery_lga} {delivery_state} | {country_code + phone_number} </p>
        </article> 
    )
}

export default AddressPreview
