require('dotenv').config();
const { readTweets } = require('./twitter');

readTweets();

console.log('Twitter Bot Location Example is running');
