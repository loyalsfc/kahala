import React from 'react'
import styles from './checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

function DeliveryMethod() {
    const {cart } = useSelector(state => state.cart)
    const {products, totalProducts} = cart;
    console.log(cart)

    return (
        <div className={styles.deliveryMethod}>
            <h5>How do you want your order delivered?</h5>
            <div className={styles.methodContainer}>
                <div className={styles.radioLabelWrapper}>
                    <input type='radio' name="delivery-method" id='pickup-station' />
                    <label className={styles.radioLabel} for='pickup-station'>Pickup Station (Cheaper Shipping Fees than Door Delivery)</label>
                </div>
                <p className={styles.arrivalNotes}>Arriving at pickup station between Wednesday 12 Apr to Wednesday 19 Apr with cheaper shipping fees</p>
                <div className={styles.methodDetails}>
                    <span>
                        <FontAwesomeIcon icon={faInfo} />
                    </span>
                    <div className={styles.radioLabel}>
                        <h5>Select pick-up station to enjoy</h5>
                        <ul className={styles.methodDetailsList}>
                            <li>- Free delivery on thousands of products in Lagos, Ibadan & Abuja</li>
                            <li>- Scheduled pickup at your own convenience</li>
                            <li>- Large items (e.g. Freezers) may arrive 2 business days later than other products.</li>
                        </ul>
                        <p>Please note that payment must be made before the package can be opened and delivery agents are not allowed to open a package.
                        Free return within 15 days for Official Store items and 7 days for other eligible items. </p>
                    </div>
                </div>
                <button className={styles.methodDetailsBtn}>SELECT PICKUP STATION</button>
            </div>

            <div style={{border: "none"}} className={styles.methodContainer}>
                <div className={styles.radioLabelWrapper}>
                    <input type='radio' name="delivery-method" id='door-delivery'/>
                    <label className={styles.radioLabel} for='door-delivery'>Door Delivery</label>
                </div>
                <p className={styles.arrivalNotes}>Delivered between Wednesday 12 Apr and Wednesday 19 Apr for <span className={styles.deliveryTotal}>₦ 3,000</span></p>
                <div className={styles.methodDetails}>
                    <span>
                        <FontAwesomeIcon icon={faInfo} />
                    </span>
                    <div className={styles.radioLabel}>
                        <ul className={styles.methodDetailsList}>
                            <li>- Free delivery on thousands of products in Lagos, Ibadan & Abuja</li>
                            <li>- Large items (e.g. Freezers) may arrive 2 business days later than other products.</li>
                            <li>- Ensure your address is current as Delivery Agents would only deliver to the stated address.</li>
                            <li>- Package may arrive before the delivery date. Payment must be made before collection as Delivery agents are not allowed to open a package</li>
                            <li>- On delivery day, delivery time may vary due to possible eventualities.</li>
                            <li>- Free return within 15 days for Official Store items and 7 days for other eligible items, </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <article className={styles.shipmentDetailsContainer}>
                <h4>SHIPMENT DETAILS</h4>
                <div className={styles.cartItemsWrapper}>
                    <ul>
                        {
                            products.map((product, index) => {
                                return(
                                    <li className={styles.cartItems} key={product?.item?.id}>
                                        <p>Shipment {index + 1} of {totalProducts}</p>
                                        <h5>
                                            <span>{product?.quantity}x</span>
                                            <span>{product?.item?.title}</span>
                                        </h5>
                                        <p>Delivered between Monday <span className={styles.expectedDate}>17 Apr</span> and Wednesday <span className={styles.expectedDate}>19 Apr</span></p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </article>
        </div>
    )
}

export default DeliveryMethod
