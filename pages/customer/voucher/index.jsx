import React from 'react'
import Head from 'next/head'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]'

function Index() {
    return (
        <div>
            <Head>
                <title>Voucher</title>
            </Head>
            <AccountLayout title="Voucher">
                <EmptyAccount
                    showLink={true}
                    link="/images/empty-voucher.svg"
                    title="You currently have no available Voucher"
                    content="All your available Vouchers will be displayed here"
                />
            </AccountLayout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions);

    if(!session){
        return {
            redirect: {
                destination: "/auth",
                parmanent: false
            }
        }
    }

    return {
        props: {user: session }
    }
}

export default Index
