import React, { useEffect, useState } from 'react'
import styles from '../pages/styles/cart.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal, decreaseCartItem, removeCart, increaseCartItem } from '../store/cartSlice'
import CartModifyBtn from './cartModifyBtn'

function CartProducts({items}) {
    const {item: product, quantity} = items
    const {id, title, images, price} = product;
    const [randomDiscount, setRandomDiscount] = useState(0);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(calculateTotal())
    },[cart])

    useEffect(()=>{
        setRandomDiscount(Math.floor(Math.random() * 50))
    }, [])

    return (
        <li>
            <Link className={styles.cartItemsDetails} href={`/category/product/${id}`}>
                <Image 
                    width={72}
                    height={72}
                    src={images[0]}
                    alt={title}
                />
                <article className={styles.cartItemTitleWrapper}>
                    <h4>{title}</h4>
                    <span>In stock </span>
                </article>
                <article className={styles.cartItemPriceWrapper}>
                    <h4 className={styles.cartItemPrice}>${price}</h4>
                    {randomDiscount !== 0 &&
                        <p>
                            <span className={styles.slashedPrice}>${((randomDiscount / 100 * price) + price).toFixed()}</span>
                            <span className={styles.discountedPercentage}>-{randomDiscount}%</span>
                        </p>
                    }
                </article>
            </Link>
            <div className={styles.cartItemModify}>
                <button onClick={()=>dispatch(removeCart(id))} className={styles.cartItemRemoveBtn}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>Delete</span>
                </button>
                <CartModifyBtn quantity={quantity} id={id} handleClick={()=>dispatch(decreaseCartItem(id))}/>
            </div>
        </li>
    )
}

export default CartProducts
