import Head from 'next/head';
import Link from 'next/link';
import React, {useMemo, useState} from 'react';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import Layout from '../../../components/layout';
import styles from './productsPage.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faFacebook, faRetweet, faShieldHalved, faStar } from '@fortawesome/free-solid-svg-icons';
import {lga} from "./lga"
import DeliveryDetails from '../../../components/deliveryDetails';

function Product({products}) {
  const productDiscount = useMemo(()=>(Math.floor(Math.random() * 50)),[products]);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedLg, setSelectedLg] = useState('Agege')

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
            <div className={styles.productsContainer}>
              <div className={styles.productInfo}>
                <div className={styles.productInfoImages}>
                  <Image
                    src={products?.images[imageIndex]}
                    width={240}
                    height={240}
                    alt="Product Image"
                  />
                  <div className={styles.otherImages}>
                    {
                      products?.images.map((img, index) => {
                        return <Image 
                          key={index}
                          src={img} 
                          height={38} 
                          width={38} 
                          alt="Alt image"
                          onClick={()=>{console.log(index); setImageIndex(index)}} 
                        />
                      })
                    }
                  </div>
                  <article>
                    <h5>SHARE THIS PRODUCT</h5>
                    <button>
                      <FontAwesomeIcon icon="fa-brands fa-facebook" />
                    </button>
                  </article>
                </div>
                <article className={styles.ProductInfoDetails}>
                  <div>
                    <h1>
                      <span>{products?.title}</span>
                      <FontAwesomeIcon icon={faHeart} />
                    </h1>
                    <div className={styles.ratingContainer}>
                      <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                      <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                      <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                      <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                      <FontAwesomeIcon icon={faStar} style={{color: "#ecc297",}} />
                      <span>(107 verified ratings)</span>
                    </div>
                  </div>
                  <div>
                    <h2 className={styles.price}>$ {products?.price}</h2>
                    {productDiscount !== 0 &&  <p>
                      <span className={styles.originalAmount}>$ {(products?.price * (productDiscount / 100) + products?.price).toFixed(0)}</span>
                      <span className={styles.discountedPercentage}>-{productDiscount}%</span>
                    </p>}
                    <span className={styles.inStockTag}>In stock</span>
                    <p className={styles.shippingSFee}>+ shipping from $10 to {selectedLg}</p>
                    <button className={styles.addCartBtn}>
                      <FontAwesomeIcon icon={faCartPlus} />
                      <span>Add to Cart</span>
                      <span />
                    </button>
                  </div>
                </article>
              </div>
              <article className={styles.productDetails}>
                <h4>Product details</h4>
                <p>{products?.description}</p>
              </article>
            </div>
            <aside className={styles.aside}>
              <h4>Delivery</h4>
              <div className={styles.deliveryLocation}>
                <h5>Choose your location </h5>
                <select className={styles.selectState} value={selectedState} onChange={(e)=>setSelectedState(e.target.value)}>
                  <option selected disabled value="">Select your state? </option>
                  <option value="Abuja">ABUJA FCT</option>
                  <option value="Abia">ABIA</option>
                  <option value="Adamawa">ADAMAWA</option>
                  <option value="Akwa Ibom">AKWA IBOM</option>
                  <option value="Anambra">ANAMBRA</option>
                  <option value="Bauchi">BAUCHI</option>
                  <option value="Bayelsa">BAYELSA</option>
                  <option value="Benue">BENUE</option>
                  <option value="Borno">BORNO</option>
                  <option value="Cross River">CROSS RIVER</option>
                  <option value="Delta">DELTA</option>
                  <option value="Ebonyi">EBONYI</option>
                  <option value="Edo">EDO</option>
                  <option value="Ekiti">EKITI</option>
                  <option value="Enugu">ENUGU</option>
                  <option value="Gombe">GOMBE</option>
                  <option value="Imo">IMO</option>
                  <option value="Jigawa">JIGAWA</option>
                  <option value="Kaduna">KADUNA</option>
                  <option value="Kano">KANO</option>
                  <option value="Katsina">KATSINA</option>
                  <option value="Kebbi">KEBBI</option>
                  <option value="Kogi">KOGI</option>
                  <option value="Kwara">KWARA</option>
                  <option value="Lagos">LAGOS</option>
                  <option value="Nassarawa">NASSARAWA</option>
                  <option value="Niger">NIGER</option>
                  <option value="Ogun">OGUN</option>
                  <option value="Ondo">ONDO</option>
                  <option value="Osun">OSUN</option>
                  <option value="Oyo">OYO</option>
                  <option value="Plateau">PLATEAU</option>
                  <option value="Rivers">RIVERS</option>
                  <option value="Sokoto">SOKOTO</option>
                  <option value="Taraba">TARABA</option>
                  <option value="Yobe">YOBE</option>
                  <option value="Zamfara">ZAMFARA</option>
                </select>
                <select className={styles.selectState} onChange={(e)=>setSelectedLg(e.target.value)}>
                  {
                    lga?.[selectedState].map((lga, index) => {
                      return <option>{lga}</option>
                    })
                  }
                </select>
              </div>
              <div>
                <DeliveryDetails
                  icon={faRetweet} 
                  heading="Return Policy" 
                  text="Free return within 15 days for Official Store items and 7 days for other eligible items."
                />
                <DeliveryDetails
                  icon={faShieldHalved} 
                  heading="Warranty" 
                  text="90-day warranty1. Free warranty scope: design defects, technical problems, and all quality problems caused by non-human damage can be repaired free of charge.2. All accessories are covered by a 90-day warranty. If there is any quality problem that is not caused by human damage, you can contact after-sales service for replacement.3. Paid maintenance: for product damage caused by external forces or human factors, such as collision, water ingress, falling, etc., after-sales service can provide maintenance services at the cost of damaged parts."
                />
              </div>
            </aside>
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
