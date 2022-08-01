const { Wit } = require('node-wit');
const IncomingWebhook = require('@slack/client').IncomingWebhook;

const client = new Wit({
    accessToken: process.env.WIT_SERVER_ACCESS_TOKEN
});
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

async function handleMessageCreated(event, sendTweet) {
    const { id_str, user, text } = event;
    const { screen_name } = user;

    try {
        const data = await client.message(text);

        if (Object.keys(data.entities).length > 0 && data.entities.local_search_query) {
            // There were some entities that we found
            const { local_search_query } = data.entities;

            const locs = local_search_query.map((loc) => {
                return loc.value;
            }).join(', ');

            sendTweet(
                id_str,
                `@${screen_name} Here are some locations we found: ${locs}`
            );
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    handleMessageCreated,
};