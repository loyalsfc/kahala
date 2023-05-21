import React from 'react'
import HomeLayout from '../components/Layout/homeLayout'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout/layout'
import Head from 'next/head'
import style from './styles/errorpage.module.css'

function Custom404() {
    return (
        <div>
            <Head>
                <title>Not Found</title>
            </Head>
            <HomeLayout>
                <Layout>
                    <main className={style.main}>
                        <aside className={style.aside}>
                            <h2 className={style.title}>Not found</h2>
                            <h4 className={style.subtitle}>We couldn’t find the page you are looking for</h4>
                            <p className={style.text}>But we have millions more shopping items for you to browse!</p>
                            <Link className={style.link} href="/">GO TO HOMEPAGE</Link> 
                        </aside>
                        <section className={style.imageWrapper}>
                            <Image
                                src="/searching.svg"
                                fill
                            />
                        </section>
                        <h2 className={style.mobiletitle}>Not Found</h2>
                    </main>
                </Layout>
            </HomeLayout>
        </div>
  )
}

export default Custom404
