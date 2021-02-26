const cities = require("./cities")
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const {places, descriptors} = require("./seedHelpers");


mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++){
    const random1000 =  Math.floor(Math.random() * 1000)   
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
        author: "60248115102a0e34103cf8a3",
        //your user id
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title:`${sample(descriptors)} ${sample(places)}`,
        description: "This is a description",
        price,
        geometry:{
            type:"Point",
            coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
        },
        images:  [
            {
              url: 'https://res.cloudinary.com/mikescloudacc/image/upload/v1613492266/Yelp%20camp/r6t9pmst5zxz1byggmto.jpg',
              filename: 'Yelp camp/r6t9pmst5zxz1byggmto'
            }
          ]
    })
    await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})