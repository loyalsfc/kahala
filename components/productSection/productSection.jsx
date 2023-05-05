import React from 'react'
import ItemsCollection from '../itemscollection/itemsCollection'
import styles from './itemsCollection.module.css'

function ProductSection({title, itemList, bgColor}) {
    return (
        <section className={styles.limitedstockWrapper}>
            <h4 style={{backgroundColor: bgColor}} className={styles.limitedstockTitle}>{title}</h4>
            <div className={styles.limitedStocksWrapper}>
                <ul className={styles.topSellingContainer}>
                    {
                        itemList.map(item =>{
                            return <ItemsCollection key={item?._id} item={item}/>
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default ProductSection
