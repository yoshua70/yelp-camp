const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/Campground');

mongoose.set('strictQuery', false); // Suppress deprecation warning
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind('Connection error: '));
db.once('open', () => {
  console.log('Database connected.');
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(3000, () => {
  console.log("Serving on port 3000");
})