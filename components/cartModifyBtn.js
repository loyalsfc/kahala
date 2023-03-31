import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import styles from "../pages/styles/cart.module.css"
import { increaseCartItem, decreaseCartItem } from '../store/cartSlice'

function CartModifyBtn({quantity, id, handleClick}) {
    const dispatch = useDispatch()

    return (
        <div className={styles.cartItemNumber}>
            <button
                onClick={handleClick} 
                // disabled={quantity == 1 ? true : false} 
                className={styles.cartItemBtn}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button onClick={()=>dispatch(increaseCartItem(id))} className={styles.cartItemBtn}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}

export default CartModifyBtn
