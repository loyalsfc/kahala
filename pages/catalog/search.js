import Head from 'next/head';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.css'
import TopSelling from '../../components/topSelling';

function Search({products, topSelling}) {
    const router = useRouter();
    console.log(products) 
    
    console.log(topSelling)
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
                                <section>
                                    
                                </section>
                            ):(
                                <article className={styles.emptySearch}>
                                    <div className={styles.searchIconWrapper}>
                                        <FontAwesomeIcon icon={faSearch} size='2xl' />
                                    </div>
                                    <h4>There is no result for "{router.query.q}"</h4>
                                    <ul>
                                        <li>- Check your spelling for typing errors</li>
                                        <li>- Try searching with short and simple keywords</li>
                                        <li>- Try searching more general terms - you can then filter the search results</li>
                                    </ul>
                                    <button className={styles.goHomeBtn}>GO TO HOMEPAGE</button>
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
