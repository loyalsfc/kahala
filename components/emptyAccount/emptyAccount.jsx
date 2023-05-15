import React from 'react'
import styles from './emptyAccount.module.css'
import Image from 'next/image'
import Link from 'next/link'

function EmptyAccount({showLink, link, title, content}) {
    return (
        <section className={styles.container}>
            <article className={styles.iconWrapper}>
                <Image
                    src={link}
                    height={100}
                    width={100}
                    alt='Empty Mail'
                />
                <h2>{title}</h2>
                <p>{content}</p>
                {showLink && <Link href="/" className={styles.continueShopping}>Continue Shopping</Link>}
            </article>
        </section>
    )
}

export default EmptyAccount
