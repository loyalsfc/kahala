import React from 'react'
import styles from './categoriesSection.module.css'
import Image from 'next/image'

function CategoriesSection({title, data}) {
    return (
        <section className={styles.accessoriesWrapper}>
            <h4 className={styles.accessoriesTitle}>{title}</h4>
            <ul className={styles.accessoriesContainer}>
                {data &&
                    data.map(item => {
                        return(
                            <li key={item?.id}>
                                <div style={{height: title === "Official Stores" ? '80px': ""}} className={styles.accessoriesImageWrapper}>
                                    <Image
                                        className={styles.accessoriesImage}
                                        fill
                                        src={item?.img}
                                        alt="Accessries"
                                    />
                                </div>
                                {item?.price && <p>Below ₦{item?.price}</p>}
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default CategoriesSection
