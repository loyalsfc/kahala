import { faCartShopping, faMinus, faPlus, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CartProducts from '../components/cartProducts';
import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import TopSelling from '../components/topSelling';
import styles from './styles/cart.module.css'

function Cart({products, carts}) {
    const {cart} = useSelector(state => state.cart)
    console.log(cart)
    const cartsItems = useMemo(()=>
        carts.map(items => {
            <CartProducts key={items?.id} />            
    }), [])

    return (
        <div>
            <Head>
                <title>Cart</title>
            </Head>
            <Header />
            <Layout>
                <main>
                    <div className={styles.cartWrapper}>
                        {carts.length === 0 ?
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
                                    <div className={styles.cartItemsWrapper}>
                                        <h1>Cart ({carts.length})</h1>
                                        <ul className={styles.cartsItemsList}>
                                            {cartsItems}
                                        </ul>
                                    </div>
                                    <aside className={styles.aside}>
                                        <h4>Cart Summary</h4>
                                        <p>
                                            <span>Subtotal</span>
                                            <span className={styles.subTotal}>${400}</span>
                                        </p>
                                        <div className={styles.checkoutBtnWrapper}>
                                            <button className={styles.checkoutBtn}>CHECKOUT (${400})</button>
                                        </div>
                                    </aside>
                                </div>
                            )
                        }
                    </div>
                    <TopSelling products={products}/>
                </main>
            </Layout>
            <Footer />
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=10&limit=10')
    const products = await res.json()

    const cartRes = await fetch('https://api.escuelajs.co/api/v1/products?offset=10&limit=3')
    const carts = await cartRes.json()

    return {
        props: {
            products,
            carts
        }
    }
}

export default Cart
