import React from 'react'
import styles from './checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import AddressForm from './addressForm'

function AddNewAddressModal({closeModal}) {
    return (
        <div className={styles.modalBg}>
            <div className={`${styles.modalContainer} ${styles.addNewAddressModal}`}>
                <header className={styles.modalHeader}>
                    <h3>Address Book</h3>
                    <button onClick={()=>closeModal(false)} className={styles.modalCloseBtn}>
                        <FontAwesomeIcon icon={faClose} size="xl"/>
                    </button>
                </header>
                <AddressForm spacing={true}/>
            </div>
        </div>
    )
}

export default AddNewAddressModal
