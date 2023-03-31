import React, { useEffect, useState } from 'react'
import styles from "../pages/styles/products.module.css"
import Link from 'next/link'
import Image from 'next/image'
import style from './itemsCollection.module.css'
import { useDispatch } from 'react-redux'
import { addCart } from '../store/cartSlice'

function ProductsList({item}) {
    const {id, images, price, title } = item;
    const [randomDiscount, setRandomDiscount] = useState(0)
    const dispatch = useDispatch();

    useEffect(()=>{
        setRandomDiscount(Math.floor(Math.random() * 50))
    }, [])

    const handleClick = () => {
        dispatch(addCart({
            item: item,
            quantity: 1
        }))
    }

    return(
            <li className={`${style.mainItemsWrap} ${style.mainProducts}`} key={id}>
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
                <button 
                    className={styles.addButton}
                    onClick={handleClick}
                >
                    Add to Cart
                </button>
            </li>
    )
}

export default ProductsList
