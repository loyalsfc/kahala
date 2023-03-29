import styles from '../pages/styles/index.module.css'
import ItemsCollection from './itemsCollection'

function TopSelling({products}) {
    
    return (
        <section className={styles.topSellingWrapper}>
            <h4 className={styles.categoryTitle}>Top Selling Items</h4>
            <div>
                <ul className={styles.topSellingContainer}>
                    {
                        products.map(item => {
                            const randomPercentage = Math.floor(Math.random() * 50)
                            return <ItemsCollection item={item} styles={styles} percentageSlash={randomPercentage} />
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default TopSelling
