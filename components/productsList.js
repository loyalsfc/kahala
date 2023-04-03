import React, { useEffect, useState } from 'react'
import styles from "../pages/styles/products.module.css"
import Link from 'next/link'
import Image from 'next/image'
import style from './itemsCollection.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, decreaseCartItem, removeCart } from '../store/cartSlice'
import CartModifyBtn from './cartModifyBtn'
import Toast from './toast/toast'

function ProductsList({item}) {
    const {id, images, price, title } = item;
    const [randomDiscount, setRandomDiscount] = useState(0)
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart)
    const quantity = cart.products.find(product => product.item.id == id)?.quantity
    const [toastCount, setToastCount] = useState({
        count: 0,
        cartMessage: ""
    })

    useEffect(()=>{
        setRandomDiscount(Math.floor(Math.random() * 50))
    }, [])

    const handleClick = () => {
        dispatch(addCart({
            item: item,
            quantity: 1
        }))
        setToastCount({count: toastCount.count + 1, cartMessage: "Item Added to Cart Successfully"});
    }

    const decreaseQty = (id) => {
        if(quantity > 1) {
          dispatch(decreaseCartItem(id))
        }else{
          dispatch(removeCart(id))
          setToastCount({count: toastCount.count + 1, cartMessage: "Item removed Successfully"});
        } 
    }

    return(
            <li className={`${style.mainItemsWrap} ${style.mainProducts}`} key={id}>
                {[...Array(toastCount.count)].map((_, index) => (
                    <Toast key={index} message={toastCount.cartMessage} duration={5000} />
                ))}
                <Link href={`/category/product/${id}`}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={images?.[0]}
                            fill={true}
                            alt={title}
                        />
                    </div>
                    <article>
                        <h5 className={style.topSellingTitle}>{title}</h5>
                        <p>${price}</p>
                        {randomDiscount != 0 &&
                            <p>
                                <span className={style.slashedPrice}>${((price * randomDiscount) / 100 + price).toFixed(0)}</span>
                                <span className={styles.percentageSlash}>-{randomDiscount}%</span>
                            </p>
                        }
                    </article>
                </Link>
                <div className={styles.btnWrapper}>
                    {cart.products.some(product => product.item.id == id) ?
                        (
                            <CartModifyBtn 
                                quantity={quantity} 
                                id={id} 
                                handleClick={()=>decreaseQty(id)}
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
