const express = require('express');
const router = express.Router();

router.post('/github', (req, res) => {
    // Handle webhook here
    console.log('===== WEBHOOK RECEIVED =====');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('============================');

    res.status(200).json({ message: 'Webhook received'});
});

module.exports = router;
