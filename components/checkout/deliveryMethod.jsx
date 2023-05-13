import React from 'react'
import styles from './checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { supabase } from '../../lib/supabaseClient'
import { priceConverion } from '../../utils/utils'
import { useRouter } from 'next/router'
import ShipmentDetails from '../shipmentDetails/shipmentDetails'

function DeliveryMethod({deliveryMethod, updateDeliveryMethod}) {
    const router = useRouter()
    const {user} = useSelector(state => state.user); 
    const {cart } = useSelector(state => state.cart);
    const {products, totalProducts} = cart;
    const doorDeliveryPerItem = 1200;
    const pickupDeliveryPerItem = 420;

    const currentDate = new Date();
    const expectedDeliveryDateStart = new Date(currentDate.setDate(currentDate.getDate() + 5))
    const expectedDeliveryDateEnd = new Date(currentDate.setDate(currentDate.getDate() + 2))
    
    function dateLocale(date){
        return `${date.toLocaleDateString("en", {weekday: 'long', day: 'numeric', month: "short"})}`
    }
    
    async function setDeliveryMethod(updatedMethod){
        const {error} = await supabase.from('user').update({delivery_method: updatedMethod}).eq("user_id", user?.email)
        updateDeliveryMethod(updatedMethod)
    }

    const proceedToNextStep=()=>{
        console.log(deliveryMethod)
        if(!deliveryMethod) return;
        router.push('/pagecheckout/summary');
    }

    return (
        <div className={styles.deliveryMethod}>
            <div className={styles.methodContainer}>
                <div className={styles.radioLabelWrapper}>
                    <input 
                        defaultChecked={deliveryMethod == 'pickup' ? true : false} 
                        type='radio' 
                        name="delivery-method" 
                        id='pickup-station' 
                        onChange={()=>setDeliveryMethod('pickup')}
                    />
                    <label className={styles.radioLabel} htmlFor='pickup-station'>
                        Pickup Station (Cheaper Shipping Fees than Door Delivery)
                        <span className={styles.deliveryTotal}> ₦{priceConverion(pickupDeliveryPerItem * totalProducts)}</span> 
                    </label>
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
                        defaultChecked = {deliveryMethod == 'door' ? true : false}
                        type='radio' 
                        name="delivery-method" 
                        id='door-delivery'
                        onChange={()=>setDeliveryMethod('door')}
                    />
                    <label className={styles.radioLabel} htmlFor='door-delivery'>
                        Door Delivery 
                        <span className={styles.deliveryTotal}> ₦{priceConverion(doorDeliveryPerItem * totalProducts)}</span>
                    </label>
                </div>
                <p className={styles.arrivalNotes}>Delivered between {dateLocale(expectedDeliveryDateStart)} and {dateLocale(expectedDeliveryDateEnd)}</p>
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
            
            <ShipmentDetails/>

            <button onClick={proceedToNextStep} className={styles.proceedBtn}>CONFIRM DELIVERY DETAILS</button>
        </div>
    )
}



export default DeliveryMethod
