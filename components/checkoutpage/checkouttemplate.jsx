import React, { useEffect, useState } from 'react'
import Layout from '../Layout/layout'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import DeliverySumUp from '../checkout/deliverySumUp'
import Link from 'next/link'
import AddAddressModal from '../checkout/addAddressModal'
import CheckoutLayout from '../Layout/checkoutLayout/checkoutLayout'
import styles from './checkoutTemplate.module.css'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'
import { priceConverion, urlFor } from '../../utils/utils'

function Checkout({children}) {
    const {data: session, status} = useSession()
    const {user} = useSelector(state => state.user)
    const router = useRouter();
    const [displayAddressModal, setDisplayAddressModal] = useState(false)
    const address = null;
    const userFullName = "Olumide Bambe"
    const userAddress = "Adamolekun Estate, Adebayo, Ado-Ekiti, Ado Ekiti, Ekiti"
    const userPhoneNumber = "+2348104123456"
    const {cart} = useSelector(state => state.cart)
    const {totalProducts, products} = cart;
    console.log(status)
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

    if(status === "loading") return;

    if(status === "unauthenticated"){
        router.push('/auth');
        return;
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
                                                    console.log()
                                                    return (
                                                        <li key={product?.item?._id}>
                                                            <Image 
                                                                src={urlFor(product?.item?.images[0]?.asset?._ref).url()}
                                                                height={60}
                                                                width={58}
                                                                alt={product?.item?.title}
                                                            />
                                                            <article className={styles.summaryWrapperArticle}>
                                                                <p>{product?.item?.title}</p>
                                                                <p className={styles.summaryItemPrice}>₦{priceConverion(product?.item?.amount)}</p>
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
