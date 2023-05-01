import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';
import styles from '../styles/products.module.css';
import Link from 'next/link';
import Layout from '../../components/Layout/layout';
import ItemsCollection from '../../components/itemscollection/itemsCollection';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal } from '../../store/cartSlice';
import AllProducts from '../../components/allProducts';
import HomeLayout from '../../components/Layout/homeLayout';
import { client } from '../../utils/utils';

function Categories({products, param, productCategory}) {
    const dispatch = useDispatch()
    const {cart} = useSelector((state) => state.cart)
    const categoryName = productCategory?.name; 

    const limitedStock = useMemo(()=>
        products.map((item, index) => {
            if(index > 10 && index < 20){
                const randomPercentage = Math.floor(Math.random() * 50)
                return <ItemsCollection key={item?.id} item={item} styles={styles} percentageSlash={randomPercentage} />
            }
    }), [products])

    useEffect(()=>{
        dispatch(calculateTotal());
    }, [cart, dispatch])

    return (
    <div>
        <Head>
            <title>{categoryName} || Kahala Store</title>
        </Head>
        <HomeLayout>
            <main className={styles.main}>
                <Layout>
                    <p className={styles.breadCrumb}> <Link href='/'>Home</Link> / <span>{categoryName}</span></p>
                    <h2 className={styles.categoryTitle}>{categoryName}</h2>

                    <section className={styles.limitedStocks}>
                        <h4>Limited Stocks Deals</h4>
                        <div>
                            <ul className={styles.limitedStockContainer}>
                                {limitedStock}
                            </ul>
                        </div>
                    </section>
                    <AllProducts 
                        products={products}
                        categoryName={categoryName}
                        searchFilter={`categoryId=${param}`}
                        category={productCategory?._id}
                    />
                </Layout>
            </main>
        </HomeLayout>
    </div>
  )
}

export async function getStaticPaths(){
    // const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const categories = await client.fetch(`*[_type == "category"]{slug}`)

    const paths = categories.map((category) => ({
        params: {id: category.slug.current}
    }))

    return {paths, fallback: false}
}

export async function getStaticProps({ params }){
    const productCategory = await client.fetch(`*[_type == "category" && slug.current == "${params.id}"]`)
    const products = await client.fetch(`*[_type == "products" && category._ref == "${productCategory[0]._id}"]`)
    return {
        props: {
            products, param: params.id, productCategory: productCategory[0]
        }
    }
}

export default Categories
