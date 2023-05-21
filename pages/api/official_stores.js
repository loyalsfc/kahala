export default function handler(req, res){
    res.status(200).json([
            {
                id: 1,
                img: '/images/officialstores/apple.png'
            },
            {
                id: 2,
                img: '/images/officialstores/asus.png'
            },
            {
                id: 3,
                img: '/images/officialstores/hp.png'
            },
            {
                id: 4,
                img: '/images/officialstores/Samsung.jpg'
            },
            {
                id: 5,
                img: '/images/officialstores/oraimo.png'
            },
            {
                id: 6,
                img: '/images/officialstores/tecno.jpg'
            }

        ])
}