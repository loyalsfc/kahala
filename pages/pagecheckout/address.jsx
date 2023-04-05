import React from 'react'
import Layout from '../../components/layout'
import SideBar from '../../components/checkoutpage/sideBar'
import { useSelector } from 'react-redux'
import Head from 'next/head'

function address() {
    return (
        <div>
            <Head>
                <title>Address Details | Kahala </title>
            </Head>
            <Layout>
                <main>
                    
                    <SideBar />
                </main>
            </Layout>
        </div>
    )
}

export default address
