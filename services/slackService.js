require('dotenv').config();
const axios = require('axios');

async function sendToSlack(msg) {
    try {
        const res = await axios.post(
            process.env.SLACK_WEBHOOK_URL,
            {
                text: msg
            }
        );
        console.log('Message sent to Slack Successfully');
        return res;
    } catch (error) {
        console.error('Error sending to Slack:', error.message);
        throw error;
    }
};

module.exports = { sendToSlack };