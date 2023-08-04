import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import Head from 'next/head'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'

function Index() {
    return (
        <div>
            <Head>
                <title>Inbox Messages</title>
            </Head>
            <AccountLayout title="Inbox Messages">
                <EmptyAccount
                    link="/images/empty.svg"
                    title="You don't have any messages"
                    content="Here you will be able to see all the messages that we send you. Stay tuned"
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
