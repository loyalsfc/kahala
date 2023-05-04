import Head from 'next/head';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Layout from '../../../components/Layout/layout';
import styles from './productsPage.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faFacebook, faFile, faList, faRetweet, faShieldHalved, faStar } from '@fortawesome/free-solid-svg-icons';
import {lga} from "../../../utils/lga"
import DeliveryDetails from '../../../components/deliveryDetails/deliveryDetails';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, calculateTotal, decreaseCartItem, removeCart } from '../../../store/cartSlice';
import CartModifyBtn from '../../../components/cartModifyBtn';
import Toast from '../../../components/toast/toast';
import HomeLayout from '../../../components/Layout/homeLayout';
import { calculateDiscountedAmount, client, decreaseCartQtyFromDb, priceConverion, removeCartFromDb, saveCartToDb, urlFor } from '../../../utils/utils';
import SpecificationItem from '../../../components/specificationItem/specificationItem';
import { supabase } from '../../../lib/supabaseClient';

function Product({product, param, category}) {
  const {_id, title, images, brand, amount, description, discount: productDiscount, rating, feature, specifications, unit } = product;
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedLg, setSelectedLg] = useState('Agege');
  const { cart } = useSelector(state => state.cart);
  const {user} = useSelector(state => state.user);
  const [quantity, setQuantity] = useState(1);
  const [dbId, setDbId] = useState(null);
  const dispatch = useDispatch();
  const [toastCount, setToastCount] = useState({
    count: 0,
    cartMessage: ""
  });
  
  useEffect(()=>{
    dispatch(calculateTotal())
    const item = cart.products.find(product => product.item.slug.current == param) 
    setQuantity(item?.quantity)
    setDbId(item?.id)
  }, [cart, param])

  const handleClick = async () => {
    if(user){
      saveCartToDb(dispatch, product, user)
    }
    setToastCount({count: toastCount.count + 1, cartMessage: "Item Added Successfully"});
  }

  const decreaseQty = () => {
    if(quantity > 1) {
      decreaseCartQtyFromDb(dispatch, dbId, _id, quantity);
    }else{
      removeCartFromDb(dispatch, dbId, _id);
      setToastCount({count: toastCount.count + 1, cartMessage: "Item removed Successfully"});
    } 
  }

  const switchNav = (e) => {
    document.querySelectorAll('.sideNavWrap').forEach(item => {
      item.classList.remove('sideNavActive');
    })
    e.currentTarget.classList.add('sideNavActive');
  }

  function getStockText(){
    if(unit < 20){
      return "Few stocks left"
    } else if(unit < 10){
      return`${unit} item(s) left`
    } else if (unit == 0){
      return "out of stock"
    } else {
      return "In stock"
    }
  }

  return (
    <div>
      <Head>
        <title>{title} || Kahala</title>
      </Head>
      <HomeLayout>
        <main className={styles.main}>
          {[...Array(toastCount.count)].map((_, index) => (
              <Toast key={index} message={toastCount.cartMessage} duration={5000} />
            ))}
          <Layout>
            <p className={styles.breadCrumb}>
              <Link href="/">Home</Link> / 
              <Link href={`/category/${category?.slug?.current}`}> {category?.name}</Link> / 
              <span>{title}</span>
            </p>

            <section className={`${styles.productInfoWrapper} ${styles.flexStretch}`}>
              <div className={`${styles.productsContainer} ${styles.bgWhite}`}>
                <div className={styles.productInfo}>
                  <div className={styles.productInfoImages}>
                    <div className={styles.imagesWrapper}>  
                      {
                        images?.map((img, index) => {
                          return <Image 
                            key={img._key}
                            src={urlFor(img.asset._ref).url()} 
                            height={240} 
                            width={240} 
                            alt="image item"
                          />
                        })
                      }
                    </div>
                    <div className={styles.otherImages}>
                      {
                        images?.map((img, index) => {
                          return <Image 
                            key={img._key}
                            src={urlFor(img.asset._ref).url()} 
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
                        <FontAwesomeIcon icon={faHeart} style={{color: "#f68b1e"}}/>
                      </h1>
                      <p className={styles.brand}>Brand: <span>{brand} | similar products from {brand}</span></p>
                      <div className={styles.ratingContainer}>
                        {rating.count == 0 ? <>
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc",}} />
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc",}} />
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc",}} />
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc",}} />
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc",}} />
                          </>:<>
                            <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                            <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                            <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                            <FontAwesomeIcon icon={faStar} style={{color: "#F68B1E"}}/>
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc",}} />
                        </>
                        }
                        <span>({rating.count} verified ratings)</span>
                      </div>
                    </div>
                    <div>
                      <h2 className={styles.price}>₦{priceConverion(amount)}</h2>
                      {productDiscount !== 0 &&  <p>
                        <span className={styles.originalAmount}>₦{calculateDiscountedAmount(amount, productDiscount)}</span>
                        <span className={styles.discountedPercentage}>-{productDiscount}%</span>
                      </p>}
                      <span className={styles.inStockTag}>{getStockText()}</span>
                      <p className={styles.shippingSFee}>+ shipping from ₦699 to {selectedLg}</p>
                      { !cart.products.some(product => product.item.slug.current == param) ?
                        <button onClick={handleClick} className={styles.addCartBtn}>
                          <FontAwesomeIcon icon={faCartPlus} />
                          <span>Add to Cart</span>
                          <span />
                        </button> : 
                        <CartModifyBtn 
                          productId={_id} 
                          quantity={quantity} 
                          handleClick={decreaseQty}
                          dbId={dbId}
                        />
                      }
                    </div>
                  </article>
                </div>
                <span className={styles.report}>Report incorrect product information</span>
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
            <section className={`${styles.productInfoWrapper} ${styles['mt-8']}`}>
              <div className={styles.productsContainer}>
                <div id="details">
                  <article className={styles.productDetails}>
                    <h4>Product details</h4>
                    <p>{description}</p>
                  </article>
                </div>
                <div id="specification">
                  <article className={styles.productDetails} >
                    <h4>Specifications</h4>
                    <div className={styles.specificationWrapper}>
                      <SpecificationItem title="KEY FEATURES">
                        <ul>
                          {
                            feature.map((item, index) => {
                              return <li key={index}>{item}</li>
                            })
                          }
                        </ul>
                      </SpecificationItem>
                      <SpecificationItem title="SPECIFICATIONS">
                        <ul>
                          {
                            specifications.map((item, index) => {
                              return <li key={index}>{item}</li>
                            })
                          }
                        </ul>
                      </SpecificationItem>
                    </div>
                  </article>
                </div>
              </div>
              <aside className={`${styles.aside} ${styles.sticky}`}>
                <ul>
                  <li onClick={switchNav} className={`${styles.sideNavWrap} sideNavWrap sideNavActive `}>
                    <a className={`${styles.sideNav}`} href="#details"><FontAwesomeIcon icon={faFileAlt}/> Product Details</a>
                  </li>
                  <li onClick={switchNav} className={`${styles.sideNavWrap} sideNavWrap`}>
                    <a className={`${styles.sideNav}`} href="#specification"><FontAwesomeIcon icon={faList} />  Specification</a>
                  </li>
                  <li className={styles.sideNav}><FontAwesomeIcon icon={faMessage} />  Verified Customer Feedback</li>
                </ul>
              </aside>
            </section>
          </Layout>
        </main>
      </HomeLayout>
    </div>
  )
}

export async function getStaticPaths(){
    const data = await client.fetch(`*[_type == "products"]{slug}`);
    
    const paths = data.map(item => ({
        params: {id: item.slug.current}
    }))

    return {
        paths,
        fallback: false
    }
     
}

export async function getStaticProps({params}){
  const product = await client.fetch(`*[_type == "products" && slug.current == "${params.id}"]`);
  const category = await client.fetch(`*[_type == "category" && _id == "${product[0].category._ref}"]`)
  return {
    props: {product: product[0], param: params.id, category: category[0]}, 
  }
}

export default Product
