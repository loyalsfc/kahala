import React from 'react'
import Head from 'next/head'
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from '../styles/products.module.css'
import Link from 'next/link'
import Layout from '../../components/layout'

function Products({products, param}) {
    console.log(products)
  return (
    <div>
        <Head>
            <title>Kahala Store</title>
        </Head>
        <Header />
        <main className={styles.main}>
            <Layout>
                <p className={styles.breadCrumb}> <Link href='/'>Home</Link> / <Link href={`/products/${param}`}>{products?.[0]?.category?.name}</Link></p>
                <h2 className={styles.categoryTitle}>{products?.[0]?.category?.name}</h2>

                <section className={styles.limitedStocks}>
                    <h4>Limited Stocks Deals</h4>
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
