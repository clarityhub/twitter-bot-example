const Twitter = require('twitter');
const { handleMessageCreated } = require('./messages');

const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function readTweets() {
    const stream = twitter.stream(
        'statuses/filter',
        {
            track: 'idmontie',
        }
    );

    stream.on('data', function (event) {
        console.log(event);

        if (event && event.user.screen_name !== 'idmontie') {
            handleMessageCreated(event, sendTweet);
        }
    });

    stream.on('error', function (error) {
        throw error;
    });
}

function sendTweet(id, text) {
    console.log('Sending tweet: ' + text);
    twitter.post('statuses/update', {
        in_reply_to_status_id: id,
        status: text,
    });
}

module.exports = {
    readTweets,
    sendTweet,
};