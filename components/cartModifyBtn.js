import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import styles from "../pages/styles/cart.module.css"
import { increaseCartItem } from '../store/cartSlice'
import { supabase } from '../lib/supabaseClient'
import { toast } from 'react-toastify'

function CartModifyBtn({quantity, productId, handleClick, qtyLimit, dbId}) {
    const {user} = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const increaseBtn = useRef()
    const decreaseBtn = useRef()
    
    const handleCartIncrease = async() => {
        showLoading();
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
        disableShowLoading();
    }

    const disableShowLoading = () => {
        if(!decreaseBtn.current) return
        increaseBtn.current.disabled = false
        decreaseBtn.current.disabled = false
        setLoading(false);
    }

    const showLoading = () => {
        if(!decreaseBtn.current) return
        increaseBtn.current.disabled = true
        decreaseBtn.current.disabled = true
        setLoading(true);
    }

    const handleCartQtyDecrease = async () => {
        showLoading();
        await handleClick();
        disableShowLoading();
    }

    return (
        <div className={styles.cartItemNumber}>
            <button
                onClick={handleCartQtyDecrease} 
                disabled={quantity == qtyLimit ? true : false} 
                className={styles.cartItemBtn}
                ref={decreaseBtn}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            {loading ? <p className='loading animation'></p> : <span>{quantity}</span>}
            <button onClick={handleCartIncrease} ref={increaseBtn} className={styles.cartItemBtn}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}

export default CartModifyBtn
