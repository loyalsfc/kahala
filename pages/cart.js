import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartProducts from '../components/cartProducts';
import Layout from '../components/Layout/layout';
import { calculateTotal } from '../store/cartSlice';
import styles from './styles/cart.module.css'
import HomeLayout from '../components/Layout/homeLayout';
import { client, priceConverion } from '../utils/utils';
import ProductSection from '../components/productSection/productSection';

function Cart({newArrivals}) {
    const {user} = useSelector(state => state.user)
    const {cart} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const cartsItems = useMemo(()=>
        cart.products.map(item => {
            return <CartProducts items={item} key={item?.id} />          
    }), [cart])

    useEffect(()=>{
        dispatch(calculateTotal())
    }, [cart, dispatch])

    return (
        <div>
            <Head>
                <title>Cart</title>
            </Head>
            <HomeLayout>
                <Layout>
                    <main>
                        <div className={styles.cartWrapper}>
                            {cart.products.length === 0 ?
                                (
                                    <div className={styles.emptyCart}>
                                        <article>
                                            <div className={styles.iconWrapper}>
                                                <FontAwesomeIcon icon={faCartShopping} size="2xl" />
                                            </div>
                                            <h5>Your Cart is empty</h5>
                                            <p>Browse our categories and discover our best deals!</p>
                                            <Link href="/">Start Shopping </Link>
                                        </article>
                                    </div>
                                ):(
                                    <div className={styles.cartSectionContainer}>
                                        <div className={styles.cartSummaryMobile}>
                                            <h4>Cart Summary</h4>
                                            <div>
                                                <span>Subtotal</span>
                                                <span>₦{priceConverion(cart.totalPrice)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cartItemsWrapper}>
                                            <h1>Cart ({cart.totalProducts})</h1>
                                            <ul className={styles.cartsItemsList}>
                                                {cartsItems}
                                            </ul>
                                        </div>
                                        <aside className={styles.aside}>
                                            <h4>Cart Summary</h4>
                                            <p>
                                                <span>Subtotal</span>
                                                <span className={styles.subTotal}>₦{priceConverion(cart.totalPrice)}</span>
                                            </p>
                                            <div className={styles.checkoutBtnWrapper}>
                                                <Link href={user ? "/pagecheckout/summary" : "/auth"}>
                                                    <button className={styles.checkoutBtn}>CHECKOUT (₦{priceConverion(cart.totalPrice)})</button>
                                                </Link>
                                            </div>
                                        </aside>
                                        <div className={styles.mobileCheckoutBtn}>
                                            <Link href={user ? "/pagecheckout/summary" : "/auth"}>
                                                <button>CHECKOUT (₦{priceConverion(cart.totalPrice)})</button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        
                        <ProductSection
                            itemList={newArrivals}
                            title="New Arrival"
                            bgColor=""
                        />

                    </main>
                </Layout>
            </HomeLayout>
        </div>
    )
}

export async function getStaticProps(){
    const newArrivals = await client.fetch(`*[_type == "products"] | order(_createdAt desc)[0..9]`)

    return {
        props: {
            newArrivals
        }
    }
}

export default Cart
