const mongoose = require('mongoose');
const Campground = require('../models/Campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.set('strictQuery', false); // Suppress deprecation warning
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind('Connection error: '));
db.once('open', () => {
  console.log('Database connected.');
})

// Randomly return an item from the given array.
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const campground = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`
    });
    await campground.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})