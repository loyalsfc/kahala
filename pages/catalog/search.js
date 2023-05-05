import Head from 'next/head';
import Layout from '../../components/Layout/layout';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.css'
import AllProducts from '../../components/allProducts';
import Link from 'next/link';
import HomeLayout from '../../components/Layout/homeLayout';
import { client } from '../../utils/utils';
import ProductSection from '../../components/productSection/productSection';

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
                                        <h4>There is no result for &quot;{query.q}&quot;</h4>
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
                        <ProductSection title="Top Selling Products" itemList={topSelling} />
                    </main>
                </Layout>
            </HomeLayout>
        </div>
    )
}

export async function getServerSideProps({query}){
    const products = await client.fetch(`*[title match "${query.q}*" && description match "${query.q}*"]`);
    const topSelling = await client.fetch(`*[_type == "products"][0...10]`);

    return {
        props: {
            products,
            topSelling
        }
    }
}

export default Search
