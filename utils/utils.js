import imageUrlBuilder from '@sanity/image-url'
import { createClient } from "next-sanity"
import { supabase } from '../lib/supabaseClient';
import { addCart, decreaseCartItem, removeCart } from '../store/cartSlice';
import { addSaves, removeSaves } from '../store/saveSlice';

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
        const {error, data} = await supabase.from('cart')
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
export const calculateDeliveryFee = (deliveryMethod, totalProducts) =>{
    if(deliveryMethod === 'door'){
        return doorDeliveryPerItem * totalProducts;
    }
    return pickupDeliveryPerItem * totalProducts;
}

export async function changeDefaultAddress(defaultIndex, addressLists, id){
    if(defaultIndex !== null){
        const newAddress = addressLists.map((address, index) => {
            return {...address, isDefault: defaultIndex == index ? true : false}
        })
        const {error} = await supabase
            .from('user')
            .update({address: newAddress})
            .eq('id', id)
    }
}

export async function saveProduct(product, user, callback){
    const {error, data} = await supabase
        .from('saves')
        .insert({item: product, user_id: user?.email})
        .select()
    callback(addSaves(data[0]))
}

export async function unsaveProduct(saveId, callback){
    const {error, data} = await supabase
        .from('saves')
        .delete()
        .eq('id', saveId)
    callback(removeSaves(saveId))
}

function dateLocale(date){
    return `${date.toLocaleDateString("en", {weekday: 'long', day: 'numeric', month: "short"})}`
}

export function calculateDeliveryDate(date, conjunctionText){
    const expectedDeliveryDateStart = new Date(date.setDate(date.getDate() + 5))
    const expectedDeliveryDateEnd = new Date(date.setDate(date.getDate() + 2))
    return `${dateLocale(expectedDeliveryDateStart)} ${conjunctionText} ${dateLocale(expectedDeliveryDateEnd)}`
}