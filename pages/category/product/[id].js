import Head from 'next/head';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Layout from '../../../components/Layout/layout';
import styles from './productsPage.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faFacebook, faRetweet, faShieldHalved, faStar } from '@fortawesome/free-solid-svg-icons';
import {lga} from "./lga"
import DeliveryDetails from '../../../components/deliveryDetails/deliveryDetails';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, calculateTotal, decreaseCartItem, removeCart } from '../../../store/cartSlice';
import CartModifyBtn from '../../../components/cartModifyBtn';
import Toast from '../../../components/toast/toast';
import HomeLayout from '../../../components/Layout/homeLayout';

function Product({product, param}) {
  const { category, title, images, price, description } = product;
  const [productDiscount, setProductDiscount] = useState(0)
  useEffect(()=>setProductDiscount(Math.floor(Math.random() * 50)),[product]);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedLg, setSelectedLg] = useState('Agege');
  const { cart } = useSelector(state => state.cart);
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch();
  const [toastCount, setToastCount] = useState({
    count: 0,
    cartMessage: ""
  });
  
  useEffect(()=>{
    dispatch(calculateTotal())
    setQuantity(cart.products.find(product => product.item.id == param)?.quantity)
  }, [cart, param])
  console.log
  const handleClick = () => {
    dispatch(addCart({
        item: product,
        quantity: 1
    }))
    setToastCount({count: toastCount.count + 1, cartMessage: "Item Added Successfully"});
    
}

  const decreaseQty = () => {
    if(quantity > 1) {
      dispatch(decreaseCartItem(parseInt(param)))
    }else{
      dispatch(removeCart(parseInt(param)))
      setToastCount({count: toastCount.count + 1, cartMessage: "Item removed Successfully"});
    } 
  }

  return (
    <div>
      <Head>
        <title>{product.title} || Kahala</title>
      </Head>
      <HomeLayout>
        <main className={styles.main}>
          {[...Array(toastCount.count)].map((_, index) => (
              <Toast key={index} message={toastCount.cartMessage} duration={5000} />
            ))}
          <Layout>
            <p className={styles.breadCrumb}>
              <Link href="/">Home</Link> / 
              <Link href={`/category/${category?.id}`}> {category?.name}</Link> / 
              <span>{title}</span>
            </p>

            <section className={styles.productInfoWrapper}>
              <div className={styles.productsContainer}>
                <div className={styles.productInfo}>
                  <div className={styles.productInfoImages}>
                    <div className={styles.imagesWrapper}>  
                      {
                        images.map((img, index) => {
                          return <Image 
                            key={index}
                            src={img} 
                            height={240} 
                            width={240} 
                            alt="image item"
                          />
                        })
                      }
                    </div>
                    <div className={styles.otherImages}>
                      {
                        images.map((img, index) => {
                          return <Image 
                            key={index}
                            src={img} 
                            height={38} 
                            width={38} 
                            alt="image item"
                            onClick={()=>{console.log(index); setImageIndex(index)}} 
                          />
                        })
                      }
                    </div>
                    <article className={styles.shareProduct}>
                      <h5>SHARE THIS PRODUCT</h5>
                      <button>
                        {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
                      </button>
                    </article>
                  </div>
                  <article className={styles.ProductInfoDetails}>
                    <div>
                      <h1>
                        <span>{title}</span>
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
                      <h2 className={styles.price}>$ {price}</h2>
                      {productDiscount !== 0 &&  <p>
                        <span className={styles.originalAmount}>$ {(price * (productDiscount / 100) + price).toFixed(0)}</span>
                        <span className={styles.discountedPercentage}>-{productDiscount}%</span>
                      </p>}
                      <span className={styles.inStockTag}>In stock</span>
                      <p className={styles.shippingSFee}>+ shipping from $10 to {selectedLg}</p>
                      { !cart.products.some(product => product.item.id == param) ?
                        <button onClick={handleClick} className={styles.addCartBtn}>
                          <FontAwesomeIcon icon={faCartPlus} />
                          <span>Add to Cart</span>
                          <span />
                        </button> : 
                        <CartModifyBtn id={parseInt(param)} quantity={quantity} handleClick={decreaseQty}/>
                      }
                    </div>
                  </article>
                </div>
                <article className={styles.productDetails}>
                  <h4>Product details</h4>
                  <p>{description}</p>
                </article>
              </div>
              <aside className={styles.aside}>
                <h4>Delivery</h4>
                <div className={styles.deliveryLocation}>
                  <h5>Choose your location </h5>
                  <select className={styles.selectState} value={selectedState} onChange={(e)=>setSelectedState(e.target.value)}>
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
                        return <option key={index}>{lga}</option>
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
      </HomeLayout>
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
  const product = await res.json()

  return {
    props: {product, param: params.id}, 
  }
}

export default Product
