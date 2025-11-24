require('dotenv').config(); // Load .env variables
const express = require('express');
const app = express()
const { sendToSlack } = require('./services/slackService');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date() 
    });
});

// Mount webhook routes
const webhookRoutes = require('./routes/webhook');
app.use('/webhook', webhookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environent: ${process.env.NODE_ENV || 'development'}`);
});