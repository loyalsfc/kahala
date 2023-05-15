import Head from 'next/head'
import React from 'react'
import AccountLayout from '../../../components/accountLayout/accountLayout'
import EmptyAccount from '../../../components/emptyAccount/emptyAccount'
import { getSession } from 'next-auth/react'

function Index() {
    return (
        <div>
            <Head>
                <title>Saves</title>
            </Head>
            <AccountLayout title='saves'>
                <EmptyAccount
                    showLink={true}
                    link="/images/empty-save.svg"
                    title="You haven’t saved an item yet!"
                    content="Found something you like? Tap on the heart shaped icon next to the item to add it to your wishlist! All your saved items will appear here."
                />
            </AccountLayout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getSession(context)

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
