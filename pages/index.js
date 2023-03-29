import Head from "next/head"
import Header from "../components/header"
import Image from "next/image"
import styles from "./styles/index.module.css"
import Layout from "../components/layout"
import SwiperContainer from "../components/swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import ItemsCollection from "../components/itemsCollection"
import useSWR from 'swr'
import Footer from "../components/footer"
import Link from "next/link"
import TopSelling from "../components/topSelling"

function Index({categories, topSellingProducts, limitedStocks}) {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading} = useSWR('/api/phone_accessories', fetcher)
    
    return (
        <div>
            <Head>
                <title>Kahala Store</title>
            </Head>
            <Header />
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
                                            <Image
                                                src={category.image}
                                                width="120"
                                                height="120"
                                                alt={category?.name}
                                            />
                                            {category?.name}
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
                                        <Image
                                            className={styles.accessoriesImage}
                                            height={145}
                                            width={145}
                                            src={item?.img}
                                            alt="Accessries"
                                        />
                                        <p>Below ${item?.price}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
            </Layout>
            <Footer />
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
