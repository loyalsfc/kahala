import React, { useState } from 'react'
import Layout from '../Layout/layout'
import Head from 'next/head'
// import CheckoutComponent from '../checkout/checkoutComponent'
// import DeliveryMethod from '../checkout/deliveryMethod'
// import PaymentMethod from '../components/checkout/paymentMethod'
import styles from './checkoutTemplate.module.css'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import DeliverySumUp from '../checkout/deliverySumUp'
import Link from 'next/link'
import AddAddressModal from '../checkout/addAddressModal'
import CheckoutLayout from '../Layout/checkoutLayout/checkoutLayout'
// import AddressForm from '../components/checkout/addressForm'

function Checkout({children}) {
    const [displayAddressModal, setDisplayAddressModal] = useState(false)
    const address = null;
    const userFullName = "Olumide Bambe"
    const userAddress = "Adamolekun Estate, Adebayo, Ado-Ekiti, Ado Ekiti, Ekiti"
    const userPhoneNumber = "+2348104123456"
    const {cart} = useSelector(state => state.cart)
    const {totalProducts, products} = cart;

    function openAddressModal(){
        //show address modal
        setDisplayAddressModal(true)
        //disable background scrolling
        document.body.style.overflow = "hidden"
    }   

    function closeModal(){
        //hide the modal
        setDisplayAddressModal(false)
        //remove the overflow hidden property on modal close
        document.body.style.overflow = "unset"
    }

    return (
        <div>
            <Head>
                <title>Checkout Page</title>
            </Head>
            <CheckoutLayout>
                <Layout>
                    {displayAddressModal && <AddAddressModal handleClick={closeModal} />}
                    <main>
                        <div className={styles.checkoutWrapper}>
                            <section style={{flex: 1}}>
                                <h3 className={styles.headerTitle}>CHECKOUT</h3>
                                <div>
                                    {children}
                                </div>
                            </section>
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
                        </div>
                    </main>
                </Layout>
            </CheckoutLayout>
        </div>
    )
}

export default Checkout
