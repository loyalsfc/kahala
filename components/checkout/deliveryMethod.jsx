import React, { useState } from 'react'
import styles from './checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import DeliverySumUp from './deliverySumUp'
import { supabase } from '../../lib/supabaseClient'
import useSWR from 'swr'

function DeliveryMethod() {
    const {user} = useSelector(state => state.user); 
    const {data: deliveryMethod} = useSWR('deliveryMetod', async()=> await supabase
        .from('user')
        .select('delivery_method')
        .eq('user_id', user?.email))
    const {cart } = useSelector(state => state.cart);
    const {products, totalProducts, totalPrice} = cart;
    const [updatedMethod, setUpdatedMethod] = useState(null)
    const currentDate = new Date();
    const expectedDeliveryDateStart = new Date(currentDate.setDate(currentDate.getDate() + 5))
    const expectedDeliveryDateEnd = new Date(currentDate.setDate(currentDate.getDate() + 2))
    console.log(deliveryMethod?.data[0]?.delivery_method)
    
    function dateLocale(date){
        return `${date.toLocaleDateString("en", {weekday: 'long'})}  ${date.toLocaleDateString("en", {day: 'numeric', month: "short"})}`
    }
    
    async function setDeliveryMethod(){
        const {error} = await supabase.from('user').update({delivery_method: updatedMethod}).eq("user_id", user?.email)
        console.log(error)
    }

    const handleChange = (method) => {
        setUpdatedMethod(method)
    }

    return (
        <div className={styles.deliveryMethod}>
            <div className={styles.methodContainer}>
                <div className={styles.radioLabelWrapper}>
                    <input 
                        defaultChecked={deliveryMethod?.data[0]?.delivery_method == 'pickup' ? true : false} 
                        type='radio' 
                        name="delivery-method" 
                        id='pickup-station' 
                        onChange={()=>handleChange('pickup')}
                    />
                    <label className={styles.radioLabel} htmlFor='pickup-station'>Pickup Station (Cheaper Shipping Fees than Door Delivery)</label>
                </div>
                <p className={styles.arrivalNotes}>Arriving at pickup station between {dateLocale(expectedDeliveryDateStart)} to {dateLocale(expectedDeliveryDateEnd)} with cheaper shipping fees</p>
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
                    <input
                        defaultChecked = {deliveryMethod?.data[0]?.delivery_method == 'door' ? true : false}
                        type='radio' 
                        name="delivery-method" 
                        id='door-delivery'
                        onChange={()=>handleChange('door')}
                    />
                    <label className={styles.radioLabel} htmlFor='door-delivery'>Door Delivery</label>
                </div>
                <p className={styles.arrivalNotes}>Delivered between {dateLocale(expectedDeliveryDateStart)} and {dateLocale(expectedDeliveryDateEnd)} <span className={styles.deliveryTotal}>₦ 3,000</span></p>
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
                                    <li className={styles.cartItems} key={product?.id}>
                                        <p>Shipment {index + 1} of {products.length}</p>
                                        <h5>
                                            <span>{product?.quantity}x</span>
                                            <span>{product?.item?.title}</span>
                                        </h5>
                                        <p>Delivered between <span className={styles.expectedDate}>{dateLocale(expectedDeliveryDateStart)}</span> and <span className={styles.expectedDate}>{dateLocale(expectedDeliveryDateEnd)}</span></p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </article>

            <DeliverySumUp />
            <p className={styles.deliveryNotes}>You will be able to add a voucher in the next step</p>
            <button onClick={setDeliveryMethod} className={styles.proceedBtn}>Proceed to next step</button>
        </div>
    )
}



export default DeliveryMethod
