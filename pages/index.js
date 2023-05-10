import Head from "next/head"
import Image from "next/image"
import styles from "./styles/index.module.css"
import Layout from "../components/Layout/layout"
import SwiperContainer from "../components/swiper/swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import HomeLayout from "../components/Layout/homeLayout"
import { client, urlFor } from "../utils/utils"
import ProductSection from "../components/productSection/productSection"
import useFetchApi from "../utils/useFetchApi"
import CategoriesSection from "../components/categoriesSection/categoriesSection"
import ScrollBtn from "../components/scrollBtn/scrollBtn"


function Index({
        topSellingProducts, 
        limitedStocks, 
        categoryItems,
        mobilePhones,
        bestPrices,
        oraimoProducts,
        hpProducts
    }){
    const {data: accessories, isError: accesfError} = useFetchApi('phone_accessories')
    const {data: stores, isError} = useFetchApi('official_stores')
        
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
                        <ul className={styles.categoriesContainer}>
                            {
                                categoryItems?.map(category => {
                                    return(
                                        <li 
                                            key={category?._id}
                                            className={styles.categoriesItem}
                                        >   
                                            <Link href={`/category/${category?.slug?.current}`}>
                                                <div className={styles.categoriesImageWrapper}>
                                                    <Image
                                                        src={urlFor(category?.poster?.asset?._ref).url()}
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

                    <ProductSection 
                        title="Top Selling Items" 
                        itemList={topSellingProducts}
                        bgColor="#FFF"
                    />

                    <ProductSection 
                        title="Limited Stocks Deals" 
                        itemList={limitedStocks}
                    />

                    <CategoriesSection 
                        title="Phone & Accessories" 
                        data={accessories}
                    />

                    <ProductSection 
                        title="Mobile Phones" 
                        itemList={mobilePhones}
                        bgColor="#b378dc"
                    />

                    <ProductSection 
                        title="Best Price | Up to 50% Off" 
                        itemList={bestPrices}
                        bgColor="#DEF1FD"
                    />

                    <CategoriesSection 
                        title="Official Stores" 
                        data={stores}
                    />

                    <ProductSection 
                        title="Oraimo Official Store" 
                        itemList={oraimoProducts}
                        bgColor="#B5DE93"
                    />

                    <ProductSection 
                        title="HP Official Store" 
                        itemList={hpProducts}
                        bgColor="#65B4D3"
                    />
                    <div className={styles.scrollTop}>
                        <ScrollBtn />
                    </div>
                </Layout>
            </HomeLayout>
        </div>
    )
}

export async function getStaticProps(){
    const categoryItems = await client.fetch(`*[_type == "category"]`);

    const topSellingProducts = await client.fetch(`*[_type == "products"][0...10]`);

    const limitedStocks = await client.fetch(`*[_type == "products" && unit < 21]`);

    const mobilePhones = await client.fetch(`*[_type == "products" && category._ref == "7d2d2218-b418-46d4-9896-9bd57e68c251"][0...10]`)

    const bestPrices = await client.fetch(`*[_type == "products" && discount > 30][0...10]`)

    const oraimoProducts = await client.fetch(`*[_type == "products" && brand == "oraimo"][0...10]`)

    const hpProducts = await client.fetch(`*[_type == "products" && brand == "hp"][0...10]`)

    return{
        props: {
            topSellingProducts, 
            limitedStocks,
            categoryItems,
            mobilePhones,
            bestPrices,
            oraimoProducts,
            hpProducts
        }
    }
}

export default Index
