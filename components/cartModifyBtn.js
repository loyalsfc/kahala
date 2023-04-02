import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import styles from "../pages/styles/cart.module.css"
import { increaseCartItem, decreaseCartItem } from '../store/cartSlice'
import Toast from './toast/toast'

function CartModifyBtn({quantity, id, handleClick, qtyLimit}) {
    const dispatch = useDispatch()
    const [toastCount, setToastCount] = useState(0)
    const [toastMessage, setToastMessage] = useState("")
    
    const addToCart = ()=> {
        setToastCount(toastCount + 1)
        setToastMessage("Cart Quantity Increased")
        dispatch(increaseCartItem(id))
    }

    const removeFromCart = () => {
        handleClick()
        setToastCount(toastCount + 1)
        setToastMessage("Cart Quantity Decreased")
    }

    return (
        <div className={styles.cartItemNumber}>
            {[...Array(toastCount)].map((_, index) => (
                <Toast key={index} message={toastMessage} duration={5000} />
            ))}

            <button
                onClick={removeFromCart} 
                disabled={quantity == qtyLimit ? true : false} 
                className={styles.cartItemBtn}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button onClick={addToCart} className={styles.cartItemBtn}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}

export default CartModifyBtn
