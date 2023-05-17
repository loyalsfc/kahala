import { faCartShopping, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartProducts from '../components/cartProducts';
import Layout from '../components/Layout/layout';
import { calculateTotal } from '../store/cartSlice';
import styles from './styles/cart.module.css'
import HomeLayout from '../components/Layout/homeLayout';
import { client, priceConverion, removeCartFromDb, saveProduct } from '../utils/utils';
import ProductSection from '../components/productSection/productSection';
import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

function Cart({newArrivals}) {
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState(null)
    const {user} = useSelector(state => state.user)
    const {cart} = useSelector(state => state.cart)
    const {saves} = useSelector(state => state.save)
    const dispatch = useDispatch()

    const cartsItems = useMemo(()=>
        cart.products.map(item => {
            return <CartProducts 
                showModal={setShowModal} 
                items={item} 
                key={item?.id}
                setId={setProductId} 
            />          
    }), [cart])

    useEffect(()=>{
        dispatch(calculateTotal())
    }, [cart, dispatch])

    const deleteItem = async () => {
        await removeItemFromCart()
        toast('Product was removed from cart');
    }

    const removeItemFromCart = async () => {
        await removeCartFromDb(dispatch, productId?.cartItemId, productId?.productId);
        setShowModal(false);
    }

    const saveItem = async () => {
        const isSave = saves.some(product => product.item._id == productId?.productId)
        if(isSave){
            await removeItemFromCart();
            toast('This item is already in your wishlist');
            return;
        }
        const item = cart.products.find(product => product.id == productId?.cartItemId);
        await saveProduct(item.item, user, dispatch);
        await removeItemFromCart();
        toast('Product successfully added to your wishlist');  
    }

    return (
        <div>
            <Head>
                <title>Cart</title>
            </Head>
            <HomeLayout>
                <Layout>
                    {showModal &&
                        <div className='confirmationWrapper'>
                            <article className={styles.modalWrapper}>
                                <h2 className={styles.modalTitle}>
                                    <span>Remove From Cart</span>
                                    <button onClick={()=>setShowModal(false)} className={styles.modalCloseBtn}><FontAwesomeIcon icon={faClose}/></button>
                                </h2>
                                <p className={styles.modalContent}>Do you really want to remove this item from cart?</p>
                                <div className={styles.modalBtnWrapper}>
                                    <button onClick={saveItem} className={styles.toSaves}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <span>Save for later</span>
                                    </button>
                                    <button onClick={deleteItem} className={styles.removeItem}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                        <span>Remove item</span>
                                    </button>
                                </div>
                            </article>
                        </div>
                    }
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
