import Head from 'next/head';
import Layout from '../../components/Layout/layout';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.css'
import TopSelling from '../../components/topSelling';
import AllProducts from '../../components/allProducts';
import Link from 'next/link';
import HomeLayout from '../../components/Layout/homeLayout';

function Search({products, topSelling}) {
    const {query} = useRouter();

    return (
        <div>
            <Head>
                <title>Search </title>
            </Head>
            <HomeLayout>
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
                                            categoryName={"Shop Online in Nigeria"}
                                            products={products}
                                            searchFilter={`title=${query.q}`}
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
                        <TopSelling products={topSelling} />
                    </main>
                </Layout>
            </HomeLayout>
        </div>
    )
}

export async function getServerSideProps({query}){
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${query.q}`);
    const products = await res.json();

    const topSellingRes = await fetch("https://api.escuelajs.co/api/v1/products/?offset=10&limit=10")
    const topSelling = await topSellingRes.json()
    return {
        props: {
            products,
            topSelling
        }
    }
}

export default Search
