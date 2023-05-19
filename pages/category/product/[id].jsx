import Head from 'next/head';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Layout from '../../../components/Layout/layout';
import styles from './productsPage.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faHeart as heartRegular, faList, faRetweet, faShieldHalved, faStar } from '@fortawesome/free-solid-svg-icons';
import {lga} from "../../../utils/lga"
import DeliveryDetails from '../../../components/deliveryDetails/deliveryDetails';
import { useDispatch, useSelector } from 'react-redux';
import CartModifyBtn from '../../../components/cartModifyBtn';
import HomeLayout from '../../../components/Layout/homeLayout';
import { calculateDiscountedAmount, client, decreaseCartQtyFromDb, priceConverion, removeCartFromDb, saveCartToDb, saveProduct, unsaveProduct, urlFor } from '../../../utils/utils';
import SpecificationItem from '../../../components/specificationItem/specificationItem';
import ProductSection from '../../../components/productSection/productSection';
import StatesList from '../../../components/statesList';
import { toast } from 'react-toastify';

function Product({product, param, category, relatedProducts}) {
  const {_id, title, images, brand, amount, description, discount: productDiscount, rating, feature, specifications, unit, itemsInBox, productType } = product;
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedLg, setSelectedLg] = useState('Agege');
  const { cart } = useSelector(state => state.cart);
  const { saves } = useSelector(state => state.save)
  const {user} = useSelector(state => state.user);
  const [quantity, setQuantity] = useState(1);
  const [saveId, setSaveId] = useState(null)
  const [dbId, setDbId] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    const item = cart.products.find(product => product.item.slug.current == param) 
    setQuantity(item?.quantity)
    setDbId(item?.id)
  }, [cart, param])

  useEffect(()=>{
    const item = saves.find(product=> product.item.slug.current === param)
    setSaveId(item?.id)
  }, [saves, param])

  const handleClick = async (e) => {
    e.currentTarget.innerHTML = "<p class='loading animation'></p>"
    saveCartToDb(dispatch, product, user);
    toast("Item Added Successfully");
  }

  const handleWishlist = async () => {
    if(!saveId){
      saveProduct(product, user, dispatch);
    } else {
      unsaveProduct(saveId, dispatch);
    }
  }

  const decreaseQty = async() => {
    if(quantity > 1) {
      await decreaseCartQtyFromDb(dispatch, dbId, _id, quantity);
      toast("Item quantity has been updated")
    }else{
      await removeCartFromDb(dispatch, dbId, _id);
      toast("Product was removed from cart successfully")
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
          <Layout>
            <p className={styles.breadCrumb}>
              <Link href="/">Home</Link> / 
              <Link href={`/category/${category?.slug?.current}`}> {category?.name}</Link> / 
              <span>{title}</span>
            </p>

            <div className={styles.mainProductWrap}>
              <section className={`${styles.productInfoWrapper} ${styles.flexStretch}`}>
                <div className={`${styles.productsContainer} ${styles.bgWhite}`}>
                  <div className={styles.productInfo}>
                    <div className={styles.productInfoImages}>
                      <div className={styles.mobileImagesWrapper}>  
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
                      <div className={styles.desktopImagesWrapper}>
                        <Image 
                          src={urlFor(images[imageIndex]?.asset?._ref).url()} 
                          height={240} 
                          width={240} 
                          alt="image item"
                        />
                      </div>
                      {images.length > 1 &&
                        <div className={styles.otherImages}>
                          {
                            images?.map((img, index) => {
                              return <div key={img?._key} className={imageIndex == index ? 'imagesActive' : null}>
                                <Image 
                                key={img._key}
                                src={urlFor(img.asset._ref).url()} 
                                height={38} 
                                width={38} 
                                alt="image item"
                                onClick={()=>{setImageIndex(index)}} 
                              />
                              </div>
                            })
                          }
                        </div>
                      }
                      <article className={styles.shareProduct}>
                        <h5>SHARE THIS PRODUCT</h5>
                        <button>
                        </button>
                      </article>
                    </div>
                    <article className={styles.ProductInfoDetails}>
                      <div>
                        <h1>
                          <span>{title}</span>
                          <button onClick={handleWishlist} className={styles.heartWrapper}>
                            <FontAwesomeIcon icon={saveId ? heartRegular : faHeart}/>
                          </button>
                        </h1>
                        {brand && <p className={styles.brand}>Brand: <span>{brand} | similar products from {brand}</span></p>}
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
                        <h2 className={styles.price}>₦ {priceConverion(amount)}</h2>
                        {productDiscount !== 0 &&  <p>
                          <span className={styles.originalAmount}>₦ {calculateDiscountedAmount(amount, productDiscount)}</span>
                          <span className={styles.discountedPercentage}>-{productDiscount}%</span>
                        </p>}
                        <span className={styles.inStockTag}>{getStockText()}</span>
                        <p className={styles.shippingSFee}>+ shipping from ₦699 to {selectedLg}</p>
                        <div className={styles.desktopBtn}>
                          {!cart.products.some(product => product.item.slug.current == param) ?
                            (<div className={styles.addCartWrapper} onClick={handleClick}>
                              <button className={styles.addCartBtn}>
                                <FontAwesomeIcon icon={faCartPlus} />
                                <span>Add to Cart</span>
                                <span />
                              </button>
                            </div>) : ( 
                            <CartModifyBtn 
                              productId={_id} 
                              quantity={quantity} 
                              handleClick={decreaseQty}
                              dbId={dbId}
                            />)
                          }
                      </div>
                      </div>
                    </article>
                  </div>
                  <span className={styles.report}>Report incorrect product information</span>
                </div>
                <aside className={styles.aside}>
                  <h4>Delivery</h4>
                  <div className={styles.deliveryLocation}>
                    <h5>Choose your location </h5>
                    <select 
                      id='delivery_state' 
                      className={styles.selectState} 
                      value={selectedState} 
                      onChange={(e)=>setSelectedState(e.target.value)}>
                      <StatesList/>
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
                  <div id="details" className={styles.descriptionWrap}>
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
                        {itemsInBox &&
                          <SpecificationItem title="WHAT'S IN THE BOX">
                            <ul>
                              {
                                itemsInBox.map((item, index) => {
                                  return <li key={index}>{item}</li>
                                })
                              }
                            </ul>
                          </SpecificationItem>
                        }
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
              <div className={styles.mobileBtn}>
                {!cart.products.some(product => product.item.slug.current == param) ?
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
                />}
              </div>
            </div>
            {relatedProducts.length !== 0 && <ProductSection
              title="Customers who viewed this also viewed"
              itemList={relatedProducts}
            />}

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
  const [product] = await client.fetch(`*[_type == "products" && slug.current == "${params.id}"]`);
  const [category] = await client.fetch(`*[_type == "category" && _id == "${product.category._ref}"]`)
  const relatedProducts = await client.fetch(`*[_type == "products" && productType._ref == "${product?.productType?._ref}" && slug.current != "${params.id}" ]`)
  return {
    props: {product, param: params.id, category, relatedProducts}, 
  }
}

export default Product
