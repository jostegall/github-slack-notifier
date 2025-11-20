require('dotenv').config(); // Load .env variables
const express = require('express');
const app = express()
const webhookRoutes = require('./routes/webhook');
const { sendToSlack } = require('./services/slackService');


// Add middleware
app.use(express.json());

// Add routes
app.use('/webhook', webhookRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Test route for Slack messages
app.get('/test-slack', async (req, res) => {
    try {
        await sendToSlack('Test message from my app!');
        res.json({ success: true, message: 'Check your Slack channel!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});