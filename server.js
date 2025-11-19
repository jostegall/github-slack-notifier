require('dontenv').config(); // Load .env variables
const express = require('express');
const app = express()

// Add middleware
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});