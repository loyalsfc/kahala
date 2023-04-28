import React from 'react'
import styles from './checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function AddressForm({spacing}) {
    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    return (
        <form className={styles.newAddressForm} onSubmit={handleSubmit}>
            <div style={{padding: spacing ? "1.25rem 30px" : "1rem 3rem"}} className={styles.formDetailsContainer}>
                <div className={styles.formInputNameWrapper}>
                    <div className={styles.formInputWrapper}>
                        <label className={styles.formInputLabel} htmlFor="first_name">First Name</label>
                        <input type="text" id='first_name' placeholder='Adekunle' className={styles.formInput} />
                    </div>
                    <div className={styles.formInputWrapper}>
                        <label className={styles.formInputLabel} htmlFor="last_name">Last Name</label>
                        <input type="text" id='last_name' placeholder='Chioma Muhammed' className={styles.formInput} />
                    </div>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="first_name">Mobile Phone Number</label>
                    <div className={styles.formInputNumberWrapper}>
                        <input type="text" id='first_name' value="+234" disabled={true} className={`${styles.formInput} ${styles.countryCode}`} />
                        <input 
                            type="text" 
                            id='last_name' 
                            className={`${styles.formInput} ${styles.mainNumber}`} 
                            placeholder='80800000'
                        />
                    </div>
                    <button type='button' className={styles.addMoreBtn}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Add more details
                    </button>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="delivery_address">Delivery Adress</label>
                    <textarea 
                        id='delivery_address' 
                        placeholder='Street Name / Building / Apartment No / Floor' 
                        className={`${styles.formInput} ${styles.formTextArea}`} 
                    />
                    <button type='button' className={styles.addMoreBtn}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        Add more details
                    </button>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="delivery_state">State / Region</label>
                    <select 
                        id='delivery_state' 
                        placeholder='Street Name / Building / Apartment No / Floor' 
                        className={styles.formInput} 
                    >
                        <option>Please Select</option>
                    </select>
                </div>
                <div className={styles.formInputWrapper}>
                    <label className={styles.formInputLabel} htmlFor="deliver_lga">City</label>
                    <select 
                        id='delivery_lga' 
                        className={styles.formInput} 
                    >
                        <option>Please Select...</option>
                    </select>
                </div>
                <p className={styles.formnotes}>*Required</p>
            </div>
            <div style={{padding: spacing ? "1.25rem 30px" : "1rem 3rem"}} className={styles.submitBtnContainer}>
                <Link href="/pagecheckout/delivery"><button className={styles.submitBtn}>SAVE AND CONTINUE</button></Link>
            </div>
        </form>
    )
}

export default AddressForm
