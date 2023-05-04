import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import styles from "../pages/styles/cart.module.css"
import { increaseCartItem, decreaseCartItem } from '../store/cartSlice'
import Toast from './toast/toast'
import { supabase } from '../lib/supabaseClient'

function CartModifyBtn({quantity, productId, handleClick, qtyLimit, dbId}) {
    const dispatch = useDispatch()
    const [toastCount, setToastCount] = useState(0)
    const [toastMessage, setToastMessage] = useState("")
    
    const handleCartIncrease = async() => {
        //Update data in the DB
        const {data, error} = await supabase
            .from('cart')
            .update({quantity: quantity + 1})
            .eq('id', dbId)
        //Show toast
        setToastCount(toastCount + 1)
        setToastMessage("Cart Quantity Increased")
        // update state
        dispatch(increaseCartItem(productId))
    }

    const handleCartQtyDecrease = () => {
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
                onClick={handleCartQtyDecrease} 
                disabled={quantity == qtyLimit ? true : false} 
                className={styles.cartItemBtn}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>{quantity}</span>
            <button onClick={handleCartIncrease} className={styles.cartItemBtn}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}

export default CartModifyBtn
