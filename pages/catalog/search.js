import Head from 'next/head';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.css'
import TopSelling from '../../components/topSelling';
import AllProducts from '../../components/allProducts';
import { useState, useMemo } from 'react';
import ProductsList from '../../components/productsList';
import Link from 'next/link';

function Search({products}) {
    const [fetchedProducts, setFetchedProducts] = useState(products)
    const [sortParam, setSortParam] = useState('default');

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

    const {query} = useRouter();
    console.log(products) 
    return (
        <div>
            <Head>
                <title>Search </title>
            </Head>
            <Layout>
                <main className={styles.main}>
                    <div>
                        {products.length ? 
                            (
                                <div>
                                    <p className={styles.breadcrumb}>
                                        <Link href='/'>Home</Link> / <Link href={'/allproduct'}>All Products </Link> / <span>{query.q}</span>
                                    </p>
                                    <AllProducts 
                                        productsItem={productsItem}
                                        categoryName={"Shop Online in Nigeria"}
                                        fetchedProducts={fetchedProducts}
                                        setFetchedProducts={setFetchedProducts}
                                        searchFilter={`title=${query.q}`}
                                        setSortParam={setSortParam}
                                    />
                                </div>
                            ):(
                                <article className={styles.emptySearch}>
                                    <div className={styles.searchIconWrapper}>
                                        <FontAwesomeIcon icon={faSearch} size='2xl' />
                                    </div>
                                    <h4>There is no result for "{query.q}"</h4>
                                    <ul>
                                        <li>- Check your spelling for typing errors</li>
                                        <li>- Try searching with short and simple keywords</li>
                                        <li>- Try searching more general terms - you can then filter the search results</li>
                                    </ul>
                                    <Link href="/">
                                        <button className={styles.goHomeBtn}>GO TO HOMEPAGE</button>
                                    </Link>
                                </article>
                            )
                        }
                    </div>
                    {/* <TopSelling products={topSelling} /> */}
                </main>
            </Layout>
        </div>
    )
}

export async function getServerSideProps({query}){
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${query.q}`);
    const products = await res.json();
    
    return {
        props: {
            products
        }
    }
}

export default Search
