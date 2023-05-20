import Head from 'next/head'
import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'
import { getSession } from 'next-auth/react'
import { supabase } from '../../../lib/supabaseClient'
import Image from 'next/image'
import { calculateDiscountedAmount, priceConverion, saveCartToDb, unsaveProduct, urlFor } from '../../../utils/utils'
import styles from './saves.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { increaseCartItem } from '../../../store/cartSlice'
import { toast } from 'react-toastify'

function Index() {
    const dispatch = useDispatch()
    const router = useRouter()
    const {user} = useSelector(state => state.user)
    const {saves} = useSelector(state => state.save)
    const {cart} = useSelector(state => state.cart)
    
    const removeSave = async (id) => {
        await unsaveProduct(id, dispatch)
        toast('Item removed from wishlist!')
    }

    const buyItem = async (product) => {
        const cartItem = cart.products.find(item => item.item._id === product._id)
        if(cartItem){
            const {data, error} = await supabase
                .from('cart')
                .update({quantity: cartItem.quantity + 1})
                .eq('id', cartItem.id)
            dispatch(increaseCartItem(cartItem?.item._id))
        } else {
            await saveCartToDb(dispatch, product, user)
        }
        router.push('/cart')
    }

    return (
        <div>
            <Head>
                <title>Saved Items</title>
            </Head>
            <AccountLayout title={`saved items (${saves.length})`}>
                {saves.length ? (
                    <ul>
                        {
                            saves.map(item => {
                                return (
                                    <li key={item.id} className={styles.saveWrapper}>
                                        <article className={styles.saves}>
                                            <div className={styles.titleWrapper}>
                                                <Link href={item?.item?.slug?.current}>
                                                    <Image
                                                        src={urlFor(item.item.images[0].asset._ref).url(    )}
                                                        height={104}
                                                        width={104}
                                                        alt={item.item.title}
                                                    />
                                                </Link>
                                                <div className={styles.titleContainer}>
                                                    <h2 className={styles.title}><Link href={item?.item?.slug?.current}>{item.item.title}</Link></h2>
                                                    <p>₦ {priceConverion(item.item.amount)}</p>
                                                    {item.item.discount !==0 && 
                                                        <p className={styles.discountWrapper}>
                                                            <span className={styles.discount}>₦ {calculateDiscountedAmount(item.item.amount, item.item.discount)}</span> 
                                                            <span className={styles.percentageSlash}>- {item.item.discount}%</span>
                                                        </p>
                                                    }
                                                </div>
                                            </div>
                                            <div className={styles.btnWrapper}>
                                                <button onClick={()=>buyItem(item.item)} className={styles.confirmBtn}>Buy now</button>
                                                <button onClick={()=>removeSave(item.id)} className="modifyBtn">
                                                    <FontAwesomeIcon icon={faTrashAlt} /> Remove
                                                </button>
                                            </div>
                                        </article>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ):(
                    <EmptyAccount
                        showLink={true}
                        link="/images/empty-save.svg"
                        title="You haven’t saved an item yet!"
                        content="Found something you like? Tap on the heart shaped icon next to the item to add it to your wishlist! All your saved items will appear here."
                    />
                )}
            </AccountLayout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)

    if(!session){
        return {
            redirect: {
                destination: "/auth",
                parmanent: false
            }
        }
    }

    return {
        props: {user: session }
    }
}

export default Index
