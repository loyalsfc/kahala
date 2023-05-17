import React from 'react'
import styles from '../pages/styles/cart.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import CartModifyBtn from './cartModifyBtn'
import { priceConverion, calculateDiscountedAmount, urlFor, decreaseCartQtyFromDb } from '../utils/utils'
import DiscountPercentage from './discountPercentage/discountPercentage'
import { toast } from 'react-toastify'

function CartProducts({items, showModal, setId}) {
    const {item: product, quantity, id} = items;
    const {_id, title, images, amount, discount, slug} = product;
    const dispatch = useDispatch();

    const handleClick = () => {
        setId({cartItemId: id, productId: _id})
        showModal(true)
    }

    const cartDecrease = async() => {
        await decreaseCartQtyFromDb(dispatch,id, _id, quantity)
        toast("Item quantity has been updated")
    }
    
    return (
        <li className={styles.cartItemWrapper}>
            <Link className={styles.cartItemsDetails} href={`/category/product/${slug.current}`}>
                <div style={{position: "relative"}}>
                    <Image 
                        width={72}
                        height={72}
                        src={urlFor(images[0]?.asset?._ref).url()}
                        alt={title}
                    />
                    {discount !== 0 &&
                        <span className={styles.discountWrapperMobile}>
                            <DiscountPercentage discount={discount} />
                        </span>   
                    }
                </div>
                <div className={styles.cartItemMain}>
                    <article className={styles.cartItemTitleWrapper}>
                        <h4>{title}</h4>
                        <span>In stock </span>
                    </article>
                    <article className={styles.cartItemPriceWrapper}>
                        <h4 className={styles.cartItemPrice}>₦{priceConverion(amount)}</h4>
                        {discount !== 0 &&
                            <p>
                                <span className={styles.slashedPrice}>₦{calculateDiscountedAmount(amount, discount)}</span>
                                <span className={styles.discountWrapperDesktop}>
                                    <DiscountPercentage discount={discount} />
                                </span>
                            </p>
                        }
                    </article>
                </div>
            </Link>
            <div className={styles.cartItemModify}>
                <button onClick={handleClick} className={`modifyBtn ${styles.cartItemRemoveBtn}`}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>Delete</span>
                </button>
                <CartModifyBtn 
                    quantity={quantity} 
                    productId={_id} 
                    handleClick={cartDecrease} 
                    qtyLimit={1}
                    dbId={id}
                />
            </div>
        </li>
    )
}

export default CartProducts
