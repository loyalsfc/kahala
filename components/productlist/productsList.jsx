import React from 'react'
import styles from "./productLists.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import CartModifyBtn from '../cartModifyBtn'
import { calculateDiscountedAmount, decreaseCartQtyFromDb, priceConverion, removeCartFromDb, saveCartToDb, urlFor } from '../../utils/utils'
import { toast } from 'react-toastify'

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

    const handleClick = async(e) => {
        e.currentTarget.innerHTML = "<p class='loading animation'></p>";
        await saveCartToDb(dispatch, item, user);
        toast("Product added successfully");
    }

    const decreaseQty = async() => {
        if(quantity > 1) {
            await decreaseCartQtyFromDb(dispatch, dbId, _id, quantity);
            toast("Product added successfully");
        }else{
            await removeCartFromDb(dispatch, dbId, _id);
            toast("Product was removed from cart successfully");
        } 
    }
    return(
            <li className={styles.mainItemsWrap}>
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
                                dbId={dbId}
                            />
                        ):(
                            <div className={styles.addBtnWrapper} onClick={handleClick}>
                                <button 
                                    className={styles.addButton}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        )
                    }
                </div>
            </li>
    )
}

export default ProductsList
