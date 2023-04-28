import styles from '../pages/styles/index.module.css'
import ItemsCollection from './itemscollection/itemsCollection'

function TopSelling({products}) {
    
    return (
        <section className={styles.topSellingWrapper}>
            <h4 className={styles.categoryTitle}>Top Selling Items</h4>
            <div>
                <ul className={styles.topSellingContainer}>
                    {
                        products.map(item => {
                            return <ItemsCollection key={item?.id} item={item} styles={styles} />
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default TopSelling
