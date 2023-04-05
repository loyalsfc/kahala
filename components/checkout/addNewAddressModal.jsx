import React from 'react'
import styles from './checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

function AddNewAddressModal() {
    return (
        <div className={styles.modalBg}>
            <div className={`${styles.modalContainer} ${styles.addNewAddressModal}`}>
                <header className={styles.modalHeader}>
                    <h3>Address Book</h3>
                    <button className={styles.modalCloseBtn}>
                        <FontAwesomeIcon icon={faClose} size="xl"/>
                    </button>
                </header>
                <form className={styles.newAddressForm}>
                    <div>
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
                    </div>
                    <div className={styles.submitBtnContainer}>
                        <button className={styles.submitBtn}>SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewAddressModal
