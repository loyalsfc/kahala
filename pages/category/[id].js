import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from '../styles/products.module.css';
import Link from 'next/link';
import Layout from '../../components/layout';
import ItemsCollection from '../../components/itemsCollection';
import { Slider } from '@mui/material';
import ProductsList from '../../components/productsList';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal } from '../../store/cartSlice';

function Categories({products, param}) {
    const dispatch = useDispatch()
    const {cart} = useSelector((state) => state.cart)
    const [fetchedProducts, setFetchedProducts] = useState(products)
    const [sortParam, setSortParam] = useState('default');
    const [sortText, setSortText] = useState('Popularity');
    const [showSort, setShowSort] = useState(false)
    const categoryName = products?.[0]?.category?.name; 
    const [value, setValue] = useState([0, 1000])

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

    const priceFiltering = async() => {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${param}&price_min=${value[0]}&price_max=${value[1]}`)
        const result = await res.json()
        setFetchedProducts(result)
    }

    const changeSortParam = (e, sortParam) => {
        setSortParam(sortParam);
        setShowSort(false)
        setSortText(e.target.textContent)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <div>
        <Head>
            <title>Kahala Store</title>
        </Head>
        <Header />
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

                <section className={styles.mainProductSection}>
                    <aside className={styles.aside}>
                        <div className={styles.priceFiltering}>
                            <h4 className={styles.priceFilteringHeader}>
                                <span>PRICE ($)</span>
                                <button onClick={priceFiltering}>APPLY</button>
                            </h4>
                            <Slider
                                getAriaLabel={() => 'Price Range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                className={styles.sliderColor}
                                min={0}
                                max={1000}
                            />
                            <div className={styles.priceFilterInputs}>
                                <input
                                    type='number'
                                    value={value[0]}
                                    onChange={(e)=>setValue([e.target.value, value[1]])}
                                />
                                <input
                                    type='number'
                                    value={value[1]}
                                    onChange={(e)=>setValue([value[0], e.target.value])}
                                />
                            </div>
                        </div>
                    </aside>
                    <div className={styles.mainProducts}>
                        <h3>
                            <span>{categoryName}</span>
                            <div className={styles.sortingWrapper}>
                                <p style={{backgroundColor: showSort ? '#EDEDED' : null}} onClick={()=>setShowSort(!showSort)}>Sort By: {sortText}</p>
                                {showSort && <ul className={styles.sortContainer}>
                                    <li onClick={(event)=>changeSortParam(event, 'default')}>Popularity</li>
                                    <li onClick={(event)=>changeSortParam(event, 'descending')}>Price: Low to High</li>
                                    <li onClick={(event)=>changeSortParam(event, 'ascending')}>Price: High to Low</li>
                                </ul>}
                            </div>
                        </h3>
                        <p className={styles.totalProducts}>{fetchedProducts.length} products found</p>
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

export default Categories
