import React, { useState } from 'react'
import styles from "./productLists.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, decreaseCartItem, removeCart } from '../../store/cartSlice'
import CartModifyBtn from '../cartModifyBtn'
import Toast from '../toast/toast'
import { calculateDiscountedAmount, decreaseCartQtyFromDb, priceConverion, removeCartFromDb, saveCartToDb, urlFor } from '../../utils/utils'

function ProductsList({item}) {
    const {_id, images, amount, title, discount, slug } = item;
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    //Find the id if the item exist in the cart
    const cartItem = cart.products.find(product => product.item._id == _id);
    //fetch the quantity and the id
    const quantity = cartItem?.quantity
    const dbId = cartItem?.id

    const [toastCount, setToastCount] = useState({
        count: 0,
        cartMessage: ""
    })

    const handleClick = () => {
        saveCartToDb(dispatch, item, user);
        setToastCount({count: toastCount.count + 1, cartMessage: "Item Added to Cart Successfully"});
    }

    const decreaseQty = () => {
        if(quantity > 1) {
            decreaseCartQtyFromDb(dispatch, dbId, _id, quantity)
        }else{
            removeCartFromDb(dispatch, dbId, _id)
            setToastCount({count: toastCount.count + 1, cartMessage: "Item removed Successfully"});
        } 
    }
    return(
            <li className={`${styles.mainItemsWrap} ${styles.mainProducts}`}>
                {[...Array(toastCount.count)].map((_, index) => (
                    <Toast key={index} message={toastCount.cartMessage} duration={5000} />
                ))}
                <Link href={`/category/product/${slug.current}`}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={urlFor(images?.[0].asset?._ref).url()}
                            fill={true}
                            alt={title}
                        />
                    </div>
                    <article>
                        <h5 className={styles.topSellingTitle}>{title}</h5>
                        <p>₦{priceConverion(amount)}</p>
                        {discount != 0 &&
                            <p>
                                <span className={styles.slashedPrice}>₦{calculateDiscountedAmount(amount, discount)}</span>
                                <span className={styles.percentageSlash}>-{discount}%</span>
                            </p>
                        }
                    </article>
                </Link>
                <div className={styles.btnWrapper}>
                    {cart.products.some(product => product.item._id == _id) ?
                        (
                            <CartModifyBtn 
                                quantity={quantity} 
                                id={_id} 
                                handleClick={()=>decreaseQty()}
                            />
                        ):(
                            <button 
                                className={styles.addButton}
                                onClick={handleClick}
                            >
                                Add to Cart
                            </button>
                        )
                    }
                </div>
            </li>
    )
}

export default ProductsList
