import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import styles from "./itemsCollection.module.css"

function ItemsCollection({item}) {
    const [percentageSlash, setPercentageSlash] = useState()

    useEffect(()=>{
        setPercentageSlash(Math.floor(Math.random() * 50));
    }, [])

    return (
        <li className={styles.mainItemsWrap} key={item?.id}>
            <Link href={`/category/product/${item?.id}`}>
                <span className={styles.percentageSlash}>-{percentageSlash}%</span>
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.topSellingImage}
                        fill
                        src={item?.images[0]}
                        alt={item?.title}
                    />
                </div>
                <article>
                    <h5 className={styles.topSellingTitle}>{item?.title}</h5>
                    <p>${item?.price}</p>
                    <p className={styles.slashedPrice}>${((item?.price * percentageSlash) / 100 + item?.price).toFixed(0)}</p>
                </article>
            </Link>
        </li>
    )
                  
}

export default ItemsCollection
