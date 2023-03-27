import { faAppleAlt, faApple, faMessage, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import AppContainer from './appContainer'
import styles from './footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.subscriptionSection}>
            <section className={styles.container}>
                <span className={styles.title}>Kahala</span>
                <div className={styles.subscriptionContainer}>
                    <h5 className={styles.subscriptionHeading}>NEW TO KAHALA</h5>
                    <p className={styles.subscriptionText}>Subscribe to our newsletter to get updates on our latest offers!</p>
                    <div className={styles.subscriptionMenuWrapper}>
                        <div className={styles.subscriptionMenu}>
                            <FontAwesomeIcon icon={faMessage} />
                            <input type="email" placeholder='Enter Email Address' />
                        </div>
                        <button className={styles.confirmSubscription}>MALE</button>
                        <button className={styles.confirmSubscription}>FEMALE</button>
                    </div>
                </div>
                <div className={styles.appDownload}>
                    <h5 className={styles.subscriptionHeading}>DOWNLOAD KAHALA FREE APP</h5>
                    <p className={styles.subscriptionText}>Get access to exclusive offers</p>
                    <div className={styles.AppsContainer}>
                        <AppContainer
                            icon={faAppleAlt}
                            note='Download on the'
                            storeName='App Store'
                            styles={styles}
                        />
                        <AppContainer
                            icon={faPlay}
                            note='Get it on'
                            storeName='Google Play'
                            styles={styles}
                        />
                    </div>
                </div>
            </section>
        </div>
        <section className={styles.container}>
            <article>
                <h5 className={styles.footerLinkHeader}>LET US HELP YOU</h5>
                <ul className={styles.footerLinks}>
                    <li>Help Center</li>
                    <li>Contact Us</li>
                    <li>How to shop on Jumia?</li>
                    <li>Delivery options and timelines</li>
                    <li>How to return a product on Jumia?</li>
                    <li>Corporate and bulk purchases</li>
                    <li>Report a Product</li>
                    <li>Ship your package anywhere in Nigeria</li>
                    <li>Dispute Resolution Policy</li>
                    <li>Returns and Refunds Policy</li>
                </ul>
            </article>
            <article>
                <h5 className={styles.footerLinkHeader}>ABOUT KAHALA</h5>
                <ul className={styles.footerLinks}>    
                    <li>About us</li>
                    <li>Kahala careers</li>
                    <li>Kahala Express</li>
                    <li>Terms and Conditions</li>
                    <li>Privacy Notice</li>
                    <li>Cookie Notice</li>
                    <li>Kahala Global</li>
                    <li>Official Stores</li>
                    <li>Flash Sales</li>
                    <li>Tech Week 2023</li>
                </ul>
            </article>
            <article>
                <h5 className={styles.footerLinkHeader}>ABOUT KAHALA</h5>
                <ul className={styles.footerLinks}>    
                    <li>Sell on Kahala</li>
                    <li>Become a Sales Consultant</li>
                    <li>Become a Logistics Service Partner</li>
                    <li>Join the Kahala DA Academy</li>
                    <li>Join the Kahala KOL Program</li>
                </ul>
            </article>
            <article>
                <h5 className={styles.footerLinkHeader}>ABOUT KAHALA</h5>
                <ul className={`${styles.footerLinks} ${styles.footerInternational}`}>
                    <li>Algeria</li>
                    <li>Egypt</li>
                    <li>Ghana</li>
                    <li>Ivory</li> Coast
                    <li>Kenya</li>
                    <li>Morocco</li>
                    <li>Senegal</li>
                    <li>Tunisia</li>
                    <li>Uganda</li>
                    <li>Zando</li>
                </ul>
            </article>
        </section>
    </footer>
  )
}

export default Footer
