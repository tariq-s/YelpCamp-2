const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const Campground = require('../models/campground')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; ++i) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 599) + 200
        const camp = new Campground({
            author: '5fb3af56fe575114dde1b6df',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/dlve5g5qi/image/upload/v1608968009/YelpCamp/nct4lvepwfmhdxjlufel.jpg',
                filename: 'YelpCamp/nct4lvepwfmhdxjlufel'
            },
            {
                url: 'https://res.cloudinary.com/dlve5g5qi/image/upload/v1608965012/YelpCamp/ysu7ovkvunbexpucjxpf.jpg',
                filename: 'YelpCamp/ysu7ovkvunbexpucjxpf'
            }
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium deserunt eius alias, vel accusantium illum adipisci eligendi? Molestias quasi sit voluptates ipsa, impedit consectetur quibusdam. Eveniet velit dolor recusandae suscipit.",
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});