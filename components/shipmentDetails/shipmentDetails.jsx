import React from 'react'
import styles from './shipmentDetails.module.css'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { urlFor } from '../../utils/utils'

function ShipmentDetails() {
    const {cart} = useSelector(state => state.cart)
    
    return (
        <article className={styles.shipmentDetailsContainer}>
            <h4 className={styles.title}>Shipment 1/1</h4>
            <div className={styles.cartItemsWrapper}>
                <ul>
                    {cart?.products.map((product, index) => {
                        return(
                            <li className={styles.cartItems} key={product?.id}>
                                <Image
                                    src={urlFor(product?.item?.images[0].asset._ref).url()}
                                    height={40}
                                    width={40}
                                    alt={product?.item?.title}
                                />
                                <h5>
                                    <p>{product?.item?.title}</p>
                                    <p> <span>QTY: </span>{product?.quantity}</p>
                                </h5>
                            </li>
                        )})
                    }
                </ul>
            </div>
        </article>
    )
}

export default ShipmentDetails
