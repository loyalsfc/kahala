import Image from "next/image"
import Link from "next/link"
import styles from "./itemsCollection.module.css"
import { calculateDiscountedAmount, priceConverion, urlFor } from "../../utils/utils"

function ItemsCollection({item}) {
    const {slug, discount, images, title, amount} = item;
    
    return (
        <li className={styles.mainItemsWrap}>
            <Link className={styles.linkWrapper} href={`/category/product/${slug?.current}`}>
                {discount !==0 && <span className={styles.percentageSlash}>-{discount}%</span>}
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.topSellingImage}
                        fill
                        src={images[0]?.asset?._ref && urlFor(images[0]?.asset?._ref)?.url()}
                        alt={title}
                    />
                </div>
                <article className={styles.titleWrapper}>
                    <h5 className={styles.topSellingTitle}>{title}</h5>
                    <p>₦{priceConverion(amount)}</p>
                    {discount !==0 && <p className={styles.slashedPrice}>₦{calculateDiscountedAmount(amount, discount)}</p>}
                </article>
            </Link>
        </li>
    )
                  
}

export default ItemsCollection
