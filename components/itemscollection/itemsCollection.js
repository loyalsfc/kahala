import Image from "next/image"
import Link from "next/link"
import styles from "./itemsCollection.module.css"
import { calculateDiscountedAmount, priceConverion, urlFor } from "../../utils/utils"

function ItemsCollection({item}) {
    // console.log(item)
    return (
        <li className={styles.mainItemsWrap}>
            <Link href={`/category/product/${item?.slug?.current}`}>
                <span className={styles.percentageSlash}>-{item?.discount}%</span>
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.topSellingImage}
                        fill
                        src={item.images[0]?.asset?._ref && urlFor(item.images[0]?.asset?._ref)?.url()}
                        alt={item?.title}
                    />
                </div>
                <article>
                    <h5 className={styles.topSellingTitle}>{item?.title}</h5>
                    <p>${priceConverion(item?.amount)}</p>
                    <p className={styles.slashedPrice}>${calculateDiscountedAmount(item?.amount, item?.discount)}</p>
                </article>
            </Link>
        </li>
    )
                  
}

export default ItemsCollection
