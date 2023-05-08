import imageUrlBuilder from '@sanity/image-url'

import { createClient } from "next-sanity"
import { supabase } from '../lib/supabaseClient';
import { addCart, decreaseCartItem, removeCart } from '../store/cartSlice';

export const client = createClient({
    projectId: "cho2ggqw",
    dataset: "production",
    apiVersion: "2023-04-28",
    useCdn: false
})

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source)
}


export function calculateDiscountedAmount(price, discount){
    const discountAmount = (price * discount) / 100 + price;
    return parseInt(discountAmount.toFixed(0)).toLocaleString();
}

export function priceConverion(amount){
    if(!amount) return;
    return amount.toLocaleString();
}

export async function saveCartToDb(callback, product, user){
    console.log(user)
    if(user){
        const {data, error} = await supabase.from('cart')
            .insert({item: product, quantity: 1, user_id: user?.email})
            .select();
        callback(addCart(data[0]))
    }else{
        callback(addCart({item: product, quantity: 1}))
    }
}

export async function removeCartFromDb(callback, dbId, productId){
    if(dbId){
        const {error} = await supabase.from('cart')
            .delete()
            .eq('id', dbId);
    }
    callback(removeCart(productId))
}

export async function decreaseCartQtyFromDb(callback, dbId, productId, qty){
    if(dbId){
        const {error} = await supabase
            .from('cart')
            .update({quantity: qty - 1})
            .eq('id', dbId);
    }
    callback(decreaseCartItem(productId))
}

const doorDeliveryPerItem = 1200;
const pickupDeliveryPerItem = 420;
