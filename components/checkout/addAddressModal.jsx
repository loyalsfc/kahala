import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./checkout.module.css"
import { faClose, faPen, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import AddNewAddressModal from "./addNewAddressModal"


function AddAddressModal() {
    return (
        <div className={styles.modalBg}>
            <AddNewAddressModal />
            <div className={styles.modalContainer}>
                <header className={styles.modalHeader}>
                    <h3>Address Book</h3>
                    <button className={styles.modalCloseBtn}>
                        <FontAwesomeIcon icon={faClose} size="xl"/>
                    </button>
                </header>
                <div className={styles.modalNewAddressBtnWrapper}>
                    <button className={styles.modalNewAddressBtn}>
                        <FontAwesomeIcon icon={faPlusCircle} size="xl" />
                        ADD A NEW ADDRESS
                    </button>
                </div>
                <div>
                    <ul className={styles.savedAddressesWrapper}>
                        <Address 
                            id={'address1'} 
                            name="Olumide Bambe" 
                            address="Adamolekun Estate, Adebayo, Ado-Ekiti, Ado Ekiti, Ekiti"
                            phone="+2348104123410"
                        />
                    </ul>
                </div>
                <div className={styles.selectAddressBtnWrapper}>
                    <button className={styles.selectAddressBtn}>Use this address</button>
                </div>
            </div>
        </div>
    )
}

function Address({id, name, address, phone}){
    return (
        <li>
            <h4 className={styles.addressTag}>DEFAULT ADDRESS</h4>
            <div className={styles.addressDetails}>
                <input type="radio" name="selected-address" id={id} />
                <div>
                    <label className={styles.addressName} htmlFor={id}>{name}</label>
                    <p className={styles.addressContacts}>
                        <span>{address}</span> <br/>
                        <span>{phone}</span>
                    </p>
                </div>
                <div className={styles.addressDetailsBtnWrapper}>
                    <button className={styles.addressDetailsBtn}>Edit <FontAwesomeIcon icon={faPen} /></button>
                    <button className={styles.addressDetailsBtn}>Delete <FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </div>
        </li>
    )
}

export default AddAddressModal
