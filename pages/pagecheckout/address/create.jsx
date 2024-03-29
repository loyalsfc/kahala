import { getSession } from 'next-auth/react';
import React from 'react'
import Head from 'next/head';
import AddressForm from '../../../components/checkout/addressForm';
import AddressCheckout from '../../../components/addressCheckout/addressCheckout';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
function Create({user}) {
    const router = useRouter()
    function moveRoute(){
        router.push('/pagecheckout/address')
    }

    return (
        <div>
            <Head>
                <title>Create Address</title>
            </Head>
            <AddressCheckout title="Add New Address">
                <AddressForm callback={moveRoute}/>
            </AddressCheckout>
        </div>
    )
}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions);

    if(!session){
        return{
            redirect: {
                destination: '/auth',
                parmanent: false
            }
        }
    }

    return {
        props: {user: session}
    } 
}

export default Create
