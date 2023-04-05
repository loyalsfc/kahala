import React from 'react'
import styles from './sideBar.module.css'
import { useSelector } from 'react-redux'
import DeliverySumUp from '../checkout/deliverySumUp';
import Link from 'next/link';

function SideBar() {
    const {cart} = useSelector(state => state.cart);
    const {totalProducts, products} = cart;

    return (
        <aside className={styles.orderSummary}>
            <h3 className={styles.headerTitle}>ORDER SUMMARY</h3>
            <div>
                <h4>YOUR ORDER ({totalProducts} items)</h4>
                <div>
                    <ul className={styles.summaryWrapper}>
                        {
                            products.map(product => {
                                return (
                                    <li key={product?.item?.id}>
                                        <Image 
                                            src={product?.item?.images[0]}
                                            height={60}
                                            width={58}
                                            alt={product?.item?.title}
                                        />
                                        <article className={styles.summaryWrapperArticle}>
                                            <p>{product?.item?.title}</p>
                                            <p className={styles.summaryItemPrice}>${product?.item?.price}</p>
                                            <p><span className={styles.summaryQty}>Qty: </span>{product?.quantity}</p>
                                        </article>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={styles.deliverySumWrap}>
                        <DeliverySumUp />
                    </div>
                    <button className={styles.modifyCartBtn}>
                        <Link href="/cart">Modify Cart</Link>
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default SideBar
