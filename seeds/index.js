const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const axios = require("axios");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// unsplash collections.
const collectionOne = "483251"; // woods collection
const collectionTwo = "3846912"; //campgrounds collection
const collectionThree = "9046579"; //camping

async function seedImg(collection) {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "PexKkJAQvLHffmBY17m5Afv03Fx0lh7P8jBpIGKDEgU",
        collections: collection,
        count: 30,
      },
      headers: { Accept: "application/json", "Accept-Encoding": "identity" },
    });
    return resp.data.map((a) => a.urls.small);
  } catch (err) {
    console.error(err);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});

  //make 3 API requests to unsplash, 30 images per request
  const imageSetOne = await seedImg(collectionOne);
  const imageSetTwo = await seedImg(collectionTwo);
  const imageSetThree = await seedImg(collectionThree);

  //spread into one array
  const imgs = [...imageSetOne, ...imageSetTwo, ...imageSetThree]; // 90 random images

  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const imgsSeed = Math.floor(Math.random() * imgs.length);
    const campground = new Campground({
      author: "64affa791a61e91c3407df60",
      // image: `${imgs[imgsSeed]}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,

      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, tenetur. Ea, inventore ducimus quaerat nemo excepturi sit architecto? Quis cum officiis alias placeat ad esse consequuntur mollitia dolores facilis voluptatem?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/de8td3ijx/image/upload/v1689841151/YelpCamp/irmuvizclm983u9kngpu.jpg",
          filename: "YelpCamp/irmuvizclm983u9kngpu",
        },
        {
          url: "https://res.cloudinary.com/de8td3ijx/image/upload/v1689841152/YelpCamp/wsihdas8lbxszx2pqr7o.jpg",
          filename: "YelpCamp/wsihdas8lbxszx2pqr7o",
        },
      ],
    });
    await campground.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
