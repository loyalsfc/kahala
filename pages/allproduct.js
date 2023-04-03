import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../components/layout'
import Link from 'next/link'
import styles from './styles/allProducts.module.css'
import AllProducts from '../components/allProducts'

function Allproduct({products}) {

    return (
        <div>
            <Head>
                <title>Shop All Products</title>
            </Head>
            <Layout>
                <main className={styles.main}>
                    <p className={styles.breadcrumb}><Link href="/">Home</Link> / <span>All products</span> </p>
                    <AllProducts 
                        categoryName = {"Shop Online in Nigeria"}
                        products={products}
                        searchFilter=""
                    />
                </main>
            </Layout>
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch('https://api.escuelajs.co/api/v1/products')
    const products = await res.json()
    
    return {
        props: {products}
    }
}

export default Allproduct
