import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/products.module.css';
import Link from 'next/link';
import Layout from '../../components/layout';
import ItemsCollection from '../../components/itemsCollection';
import ProductsList from '../../components/productsList';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal } from '../../store/cartSlice';
import AllProducts from '../../components/allProducts';
import Toast from '../../components/toast/toast';

function Categories({products, param}) {
    const dispatch = useDispatch()
    const {cart} = useSelector((state) => state.cart)
    const [fetchedProducts, setFetchedProducts] = useState(products)
    const [sortParam, setSortParam] = useState('default');
    const [toastCount, setToastCount] = useState(0);


    const categoryName = products?.[0]?.category?.name; 

    const productsItem = useMemo(() => fetchedProducts.sort((a, b) => {
        if(sortParam === "ascending"){
            return b.price - a.price
        } else if(sortParam === "descending"){
            return a.price - b.price
        } else {
            return a.id - b.id
        }
    }).map(item => {
        return <ProductsList item={item} />
    }), [fetchedProducts, sortParam])

    const limitedStock = useMemo(()=>
        products.map((item, index) => {
            if(index > 10 && index < 20){
                const randomPercentage = Math.floor(Math.random() * 50)
                return <ItemsCollection item={item} styles={styles} percentageSlash={randomPercentage} />
            }
    }), [products])

    useEffect(()=>{
        dispatch(calculateTotal())
    }, [cart])

    return (
    <div>
        <Head>
            <title>Kahala Store</title>
        </Head>
        <main className={styles.main}>
            <Layout>
                <p className={styles.breadCrumb}> <Link href='/'>Home</Link> / <Link href={`/category/${param}`}>{categoryName}</Link></p>
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
                    productsItem={productsItem}
                    categoryName={categoryName}
                    fetchedProducts={fetchedProducts}
                    setFetchedProducts={setFetchedProducts}
                    searchFilter={`categoryId=${param}`}
                    setSortParam={setSortParam}
                />
            </Layout>
        </main>
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

export default Categories
