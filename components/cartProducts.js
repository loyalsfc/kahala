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
import { priceConverion, calculateDiscountedAmount, urlFor, removeCartFromDb, decreaseCartQtyFromDb } from '../utils/utils'

function CartProducts({items}) {
    const {item: product, quantity, id} = items;
    const {_id, title, images, amount, discount, slug} = product;
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const [toastCount, setToastCount] = useState(0)

    const deleteItem = () => {
        removeCartFromDb(dispatch, id, _id);
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
                <CartModifyBtn 
                    quantity={quantity} 
                    productId={_id} 
                    handleClick={()=>decreaseCartQtyFromDb(dispatch,id, _id, quantity)} 
                    qtyLimit={1}
                    dbId={id}
                />
            </div>
        </li>
    )
}

export default CartProducts
