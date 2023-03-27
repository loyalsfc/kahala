import Image from "next/image"

function ItemsCollection({styles, percentageSlash, item}) {
    return (
        <li key={item?.id}>
            <span className={styles.percentageSlash}>-{percentageSlash}%</span>
            <Image
                className={styles.topSellingImage}
                height={223}
                width={223}
                src={item?.images[0]}
                alt={item?.name}
            />
            <article>
                <h5 className={styles.topSellingTitle}>{item?.title}</h5>
                <p>${item?.price}</p>
                <p className={styles.slashedPrice}>${((item?.price * percentageSlash) / 100 + item?.price).toFixed(0)}</p>
            </article>
        </li>
    )
                  
}

export default ItemsCollection
