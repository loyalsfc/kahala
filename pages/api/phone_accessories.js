export default function handler(req, res){
    res.status(200).json([
            {
                id: 1,
                img: '/images/accessories/ipads.jpg',
                price: 600
            },
            {
                id: 2,
                img: '/images/accessories/Android_tablet.jpg',
                price: 473
            },
            {
                id: 3,
                img: '/images/accessories/Cellphones.jpg',
                price: 33
            },
            {
                id: 4,
                img: '/images/accessories/iphone.jpg',
                price: 399
            },
            {
                id: 5,
                img: '/images/accessories/Android_Phones.jpg',
                price: 200
            },
            {
                id: 6,
                img: '/images/accessories/Brand_Phones.jpg',
                price: 188
            }

        ])
}