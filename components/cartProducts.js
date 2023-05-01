import React, { useEffect, useState } from 'react'
import styles from '../pages/styles/cart.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal, decreaseCartItem, removeCart, increaseCartItem } from '../store/cartSlice'
import CartModifyBtn from './cartModifyBtn'
import Toast from './toast/toast'
import { priceConverion, calculateDiscountedAmount, urlFor } from '../utils/utils'

function CartProducts({items}) {
    const {item: product, quantity} = items;
    const {_id, title, images, amount, discount, slug} = product;
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const [toastCount, setToastCount] = useState(0)
    
    useEffect(()=>{
        dispatch(calculateTotal())
    },[cart, dispatch])


    const deleteItem = () => {
        dispatch(removeCart(_id));
        setToastCount(toastCount + 1);
    }

    return (
        <li>
            {[...Array(toastCount)].map((_, index) => (
                <Toast key={index} message="Cart Item Removed" duration={5000} />
            ))}
            <Link className={styles.cartItemsDetails} href={`/category/product/${slug.current}`}>
                <Image 
                    width={72}
                    height={72}
                    src={urlFor(images[0]?.asset?._ref).url()}
                    alt={title}
                />
                <article className={styles.cartItemTitleWrapper}>
                    <h4>{title}</h4>
                    <span>In stock </span>
                </article>
                <article className={styles.cartItemPriceWrapper}>
                    <h4 className={styles.cartItemPrice}>₦{priceConverion(amount)}</h4>
                    {discount !== 0 &&
                        <p>
                            <span className={styles.slashedPrice}>₦{calculateDiscountedAmount(amount, discount)}</span>
                            <span className={styles.discountedPercentage}>-{discount}%</span>
                        </p>
                    }
                </article>
            </Link>
            <div className={styles.cartItemModify}>
                <button onClick={deleteItem} className={styles.cartItemRemoveBtn}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>Delete</span>
                </button>
                <CartModifyBtn quantity={quantity} id={_id} handleClick={()=>dispatch(decreaseCartItem(_id))} qtyLimit={1}/>
            </div>
        </li>
    )
}

export default CartProducts
