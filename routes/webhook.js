const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { sendToSlack } = require('../services/slackService');
const {
    formatPushEvent,
    formatPullEvent,
    formatIssuesEvent
} = require('../utils/formatters');

// Verify that the webhook request came from Github
function verifySignature (req) {
    // Get the signature from Github
    const signature = req.headers['x-hun-signature-256'];

    // if no signature, reject (unless we're in development)
    if (!signature && process.env.NODE_ENV === 'production') {
        return false;
    }

    // If no secret configure, skip verification
    if (!process.env.WEBHOOK_SECRET) {
        console.warn(' WEBHOOK_SECRET not set - skipping signature verification');
        return true;
    }

    // Create our own signature using the secret
    const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
    const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

    // Compare signatures (timing-safe comparison)
    try {
        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(digest)
        )
    } catch (error) {
        return false;
    }
};

router.post('/github', async (req, res) => {
    // verify signature first
    if (!verifySignature(req)) {
        console.error('Invalid signature - webhook rejected');
        return res.status(401).json({ 
            error: 'Invalid signature',
            message: 'Invalid signature'
        });
    }

    const eventType = req.headers['x-github-event'];
    const payload = req.body;

    console.log(`Received ${eventType} event from Github`);

    try {
        let msg;

        switch (eventType) {
            case 'push':
                msg = formatPushEvent(payload);
                break;

            case 'pull_request':
                msg = formatPullEvent(payload);
                break;

            case 'issues':
                msg = formatIssuesEvent(payload);
                break;

            default:
                console.log(`Unhandled event type: ${eventType}`);
                return res.status(200).json({
                    message: 'Event type not handled'
                });
        }
        // Send to Slack
        await sendToSlack(msg);

        // Respond to Github
        res.status(200).json({
            message: 'Webhook processed successfully'
        });

    } catch (error) {
        console.error('Error procesiong webhook:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

module.exports = router;
