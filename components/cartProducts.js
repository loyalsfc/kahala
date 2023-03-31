import React, { useEffect, useState } from 'react'
import styles from '../pages/styles/cart.module.css'

function CartProducts() {
    const [randomDiscount, setRandomDiscount] = useState(0)
    
    useEffect(()=>{
        setRandomDiscount(Math.floor(Math.random() * 50))
    }, [])

    return (
        <li>
            <Link className={styles.cartItemsDetails} href={`/category/product/${items?.id}`}>
                <Image 
                    width={72}
                    height={72}
                    src={items?.images[0]}
                    alt={items?.title}
                />
                <article className={styles.cartItemTitleWrapper}>
                    <h4>{items?.title}</h4>
                    <span>In stock </span>
                </article>
                <article className={styles.cartItemPriceWrapper}>
                    <h4 className={styles.cartItemPrice}>${items?.price}</h4>
                    <p>
                        <span className={styles.slashedPrice}>${((randomDiscount / 100 * items?.price) + items?.price).toFixed()}</span>
                        <span className={styles.discountedPercentage}>-{randomDiscount}%</span>
                    </p>
                </article>
            </Link>
            <div className={styles.cartItemModify}>
                <button className={styles.cartItemRemoveBtn}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>Delete</span>
                </button>
                <div className={styles.cartItemNumber}>
                    <button disabled={true} className={styles.cartItemBtn}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>1</span>
                    <button className={styles.cartItemBtn}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </li>
    )
}

export default CartProducts
