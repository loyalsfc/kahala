import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from '../styles/products.module.css'
import style from '../../components/itemsCollection.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'
import ItemsCollection from '../../components/itemsCollection'
import Image from 'next/image'

function Products({products, param}) {
    const [sortParam, setSortParam] = useState('Popularity')
    const categoryName = products?.[0]?.category?.name; 

    const productsItem = useMemo(() => products.map(item => {
        const randomPercentage = Math.floor(Math.random() * 50)
        return(
            <li className={`${style.mainItemsWrap} ${style.mainProducts}`} key={item?.id}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={item?.images?.[0]}
                        fill={true}
                    />
                </div>
                <article>
                    <h5 className={style.topSellingTitle}>{item?.title}</h5>
                    <p>${item?.price}</p>
                    {randomPercentage != 0 &&
                        <p>
                            <pan className={style.slashedPrice}>${((item?.price * randomPercentage) / 100 + item?.price).toFixed(0)}</pan>
                            <span className={styles.percentageSlash}>-{randomPercentage}%</span>
                        </p>
                    }
                    <button className={styles.addButton}>Add to Cart</button>
                </article>
            </li>
        )
    }), [products])

    return (
    <div>
        <Head>
            <title>Kahala Store</title>
        </Head>
        <Header />
        <main className={styles.main}>
            <Layout>
                <p className={styles.breadCrumb}> <Link href='/'>Home</Link> / <Link href={`/products/${param}`}>{categoryName}</Link></p>
                <h2 className={styles.categoryTitle}>{categoryName}</h2>

                <section className={styles.limitedStocks}>
                    <h4>Limited Stocks Deals</h4>
                    <div>
                        <ul className={styles.limitedStockContainer}>
                            {
                                products.map((item, index) => {
                                    if(index > 10 && index < 20){
                                        const randomPercentage = Math.floor(Math.random() * 50)
                                        return <ItemsCollection item={item} styles={styles} percentageSlash={randomPercentage} />
                                    }
                                })
                            }
                        </ul>
                    </div>
                </section>

                <section className={styles.mainProductSection}>
                    <aside className={styles.aside}></aside>
                    <div className={styles.mainProducts}>
                        <h3>
                            <span>{categoryName}</span>
                            <p>Sort By: {sortParam}</p>
                        </h3>
                        <p className={styles.totalProducts}>{products.length} products found</p>
                        <ul className={styles.mainPageItems}>
                            {productsItem}
                        </ul>
                    </div>
                </section>
            </Layout>
        </main>
        <Footer />
    </div>
  )
}

export async function getStaticPaths(){
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const categories = await res.json()

    const paths = categories.map((category) => ({
        params: {id: category.id.toString()}
    }))

    return {paths, fallback: false}
}

export async function getStaticProps({ params }){
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${params.id}`)
    const products = await res.json()

    return {
        props: {
            products, param: params.id
        }
    }
}

export default Products
