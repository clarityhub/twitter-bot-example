# Slack Bot Example

## Getting Started

You need to copy `.env.example` to `.env`.

```
$ cp .env.example .env
```

The `.env` file will need your Wit.ai server access token and your Twitter access tokens. Go to [Apps](apps.twitter.com) and make a new app; then, go to the `Keys and Access Tokens` section and get your API key and secret and generate a new access token/secret.

Once you have those added to your env file, you can run:

```
$ nvm use 8.0.0
$ npm i -g nodemon
$ yarn start
```

## Notes

This uses Twitters streaming API, which is heavily rate limited. You can do about 1 stream request every minute. So watch out with restarting your node app. You will get a `420 HTTP RESPONSE` when you have been rate limited.