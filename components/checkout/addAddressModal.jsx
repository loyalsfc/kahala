import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./checkout.module.css"
import { faClose, faPen, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

function AddAddressModal() {
    return (
        <div className={styles.modalBg}>
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
            </div>
        </div>
    )
}

function Address({id, name, address, phone}){
    return (
        <li>
            <h4>DEFAULT ADDRESS</h4>
            <div className={styles.addressDetails}>
                <input type="radio" name="selected-address" id={id} />
                <p>
                    <span>{name}</span> <br />
                    <span>{address}</span> <br/>
                    <span>{phone}</span>
                </p>
                <div>
                    <button>Edit <FontAwesomeIcon icon={faPen} /></button>
                    <button>Delete <FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </div>
        </li>
    )
}

export default AddAddressModal
