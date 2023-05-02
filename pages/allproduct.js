import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../components/Layout/layout'
import Link from 'next/link'
import styles from './styles/allProducts.module.css'
import AllProducts from '../components/allProducts'
import HomeLayout from '../components/Layout/homeLayout'
import { client } from '../utils/utils'

function Allproduct({products}) {

    return (
        <div>
            <Head>
                <title>Shop All Products</title>
            </Head>
            <HomeLayout>
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
            </HomeLayout>
        </div>
    )
}

export async function getStaticProps(){
    const products = await client.fetch(`*[_type == "products"]`)
    
    return {
        props: {products}
    }
}

export default Allproduct
