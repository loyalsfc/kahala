import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../pages/styles/cart.module.css"
import { increaseCartItem } from '../store/cartSlice'
import { supabase } from '../lib/supabaseClient'
import { toast } from 'react-toastify'

function CartModifyBtn({quantity, productId, handleClick, qtyLimit, dbId}) {
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    const handleCartIncrease = async() => {
        if(user){
            //Update data in the DB
            const {data, error} = await supabase
                .from('cart')
                .update({quantity: quantity + 1})
                .eq('id', dbId)
        }
        //Show toast
        toast("Cart Quantity Increased!")
        // update state
        dispatch(increaseCartItem(productId))
    }

    const handleCartQtyDecrease = () => {
        handleClick()
    }

    return (
        <div className={styles.cartItemNumber}>
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
