import Head from "next/head"
import Header from "../components/header/header"
import Image from "next/image"
import styles from "./styles/index.module.css"
import Layout from "../components/Layout/layout"
import SwiperContainer from "../components/swiper/swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import ItemsCollection from "../components/itemscollection/itemsCollection"
import useSWR from 'swr'
import Link from "next/link"
import TopSelling from "../components/topSelling"
import HomeLayout from "../components/Layout/homeLayout"

function Index({categories, topSellingProducts, limitedStocks}) {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading} = useSWR('/api/phone_accessories', fetcher)
    
    return (
        <div>
            <Head>
                <title>Kahala Store</title>
            </Head>
            <HomeLayout>
                <Layout>
                    <section className={styles.heroSection}>
                        <SwiperContainer />
                        <div className={styles.heroImages}>
                            <div className={styles.heroImageWrapper}>
                                <Image
                                    src="/images/promoImages/free-delivery.png"
                                    height="184"
                                    width="218"
                                    alt="Hero image"
                                />
                            </div>
                            <div className={styles.heroImageWrapper}>
                                <Image
                                    src="/images/promoImages/TW-Countdown.gif"
                                    height="184"
                                    width="218"
                                    alt="Hero Image"
                                />
                            </div>
                        </div>
                    </section>
                    <div className={styles.categoriesWrapper}>
                        <button className={`${styles.categoriesScroll} ${styles.categoriesScrollLeft}`}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button className={`${styles.categoriesScroll} ${styles.categoriesScrollRight}`}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <ul className={styles.categoriesContainer}>
                            {
                                categories.map(category => {
                                    return(
                                        <li 
                                            key={category?.id}
                                            className={styles.categoriesItem}
                                        >   
                                            <Link href={`/category/${category?.id}`}>
                                                <div className={styles.categoriesImageWrapper}>
                                                    <Image
                                                        src={category.image}
                                                        fill
                                                        sizes="(max-width: 640px) 85px,
                                                        (max-width: 1200px) 150px,
                                                        33vw"
                                                        alt={category?.name}
                                                    />
                                                </div>
                                                <span className={styles.categoriesTitle}>{category?.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <TopSelling products={topSellingProducts}/>

                    <section className={styles.limitedstockWrapper}>
                        <h4 className={styles.limitedstockTitle}>Limited Stocks Deals</h4>
                        <div className={styles.limitedStocksWrapper}>
                            <ul className={styles.topSellingContainer}>
                                {
                                    limitedStocks.map(item =>{
                                        const randomPercentage = Math.floor(Math.random() * 50)
                                        return <ItemsCollection item={item} styles={styles} percentageSlash={randomPercentage} />
                                    })
                                }
                            </ul>
                        </div>
                    </section>

                    <section className={styles.accessoriesWrapper}>
                        <h4 className={styles.accessoriesTitle}>Phone & Accessories</h4>
                        <ul className={styles.accessoriesContainer}>
                            {data &&
                                data.map(item => {
                                    return(
                                        <li key={item?.id}>
                                            <div className={styles.accessoriesImageWrapper}>
                                                <Image
                                                    className={styles.accessoriesImage}
                                                    fill
                                                    src={item?.img}
                                                    alt="Accessries"
                                                />
                                            </div>
                                            <p>Below ${item?.price}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                </Layout>
            </HomeLayout>
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const categories = await res.json()

    const productRes = await fetch('https://api.escuelajs.co/api/v1/products?offset=10&limit=10');
    const topSellingProducts = await productRes.json()

    const productsResponse = await fetch('https://api.escuelajs.co/api/v1/products?offset=30&limit=10')
    const limitedStocks = await productsResponse.json()

    return{
        props: {
            categories,
            topSellingProducts,
            limitedStocks        
        }
    }
}

export default Index
