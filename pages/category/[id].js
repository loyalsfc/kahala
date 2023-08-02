import Head from 'next/head';
import styles from '../styles/products.module.css';
import Link from 'next/link';
import Layout from '../../components/Layout/layout';
import AllProducts from '../../components/allProducts';
import HomeLayout from '../../components/Layout/homeLayout';
import { client } from '../../utils/utils';
import ProductSection from '../../components/productSection/productSection';

function Categories({products, param, productCategory, limitedStock, topDeals}) {
    const categoryName = productCategory?.name; 

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

                    <ProductSection
                        title="Limited Stocks Deals"
                        itemList={limitedStock}
                        bgColor='#AADEF1'
                    />

                    <ProductSection
                        title="Top Deals"
                        itemList={topDeals}
                        bgColor='#FFF'
                    />

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

export async function getServerSideProps({ params }){
    const [productCategory] = await client.fetch(`*[_type == "category" && slug.current == "${params.id}"]`);
    const products = await client.fetch(`*[_type == "products" && category._ref == "${productCategory._id}"]`);
    const limitedStock = await client.fetch(`*[_type == "products" && category._ref == "${productCategory._id}" && unit < 20][0...10]`);
    const topDeals = await client.fetch(`*[_type == "products" && category._ref == "${productCategory._id}" && discount > 40][0...10]`)
    return {
        props: {
            products, param: params.id, productCategory, limitedStock, topDeals
        }
    }
}

export default Categories
