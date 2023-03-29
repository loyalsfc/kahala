import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import Layout from '../../../components/layout';
import styles from './productsPage.module.css';
import Image from 'next/image';
// import { Twitter } from '@mui/icons-material';

function Product({products}) {
  return (
    <div>
      <Head>
        <title>{products.title} || Kahala</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <Layout>
          <p className={styles.breadCrumb}>
            <Link href="/">Home</Link> / 
            <Link href={`/category/${products?.category?.id}`}> {products?.category?.name}</Link> / 
            <span>{products?.title}</span>
          </p>

          <section className={styles.productInfoWrapper}>
            <div className={styles.productInfo}>
              <div className={styles.productInfoImages}>
                <Image
                  src={products?.images[0]}
                  width={240}
                  height={240}
                  alt="Product Image"
                />
                <div className={styles.otherImages}>
                  {
                    products?.images.map(img => {
                      return <Image src={img} height={38} width={38} alt="Alt image" />
                    })
                  }
                </div>
                <article>
                  <h5>SHARE THIS PRODUCT</h5>
                  <button>
                    {/* <Twitter /> */}
                  </button>
                </article>
              </div>
              <article className={styles.ProductInfoDetails}>
                <h1>{products?.title}</h1>
              </article>
            </div>
            <aside className={styles.aside}></aside>
          </section>
        </Layout>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticPaths(){
    const res = await fetch('https://api.escuelajs.co/api/v1/products')
    const data = await res.json();
    
    const paths = data.map(item => ({
        params: {id: item.id.toString()}
    }))

    return {
        paths,
        fallback: false
    }
     
}

export async function getStaticProps({params}){
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`)
  const products = await res.json()

  return {
    props: {products}, 
  }
}

export default Product
