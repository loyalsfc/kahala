import imageUrlBuilder from '@sanity/image-url'

import { createClient } from "next-sanity"

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