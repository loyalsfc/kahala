import Head from "next/head"
import Header from "../components/header"
import Image from "next/image"
import styles from "./styles/index.module.css"
import Layout from "../components/layout"

function Index({categories}) {
    
    return (
        <div>
            <Head>
                <title>Kahala Store</title>
            </Head>
            <Header />
            <Layout>
                <section>
                    <div></div>
                    <div></div>
                </section>
                <ul className={styles.categoriesContainer}>
                    {
                        categories.map(category => {
                            return(
                                <li 
                                    key={category?.id}
                                    className={styles.categoriesItem}
                                >
                                    <Image
                                        src={category.image}
                                        width="120"
                                        height="120"
                                        alt={category?.name}
                                    />
                                    {category?.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </Layout>
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const categories = await res.json()

    return{
        props: {
            categories
        }
    }
}

export default Index
