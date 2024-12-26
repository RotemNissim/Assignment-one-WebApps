const express = require('express');
const router = express.Router();

router.get('/comment', (req, res) => {
    res.send('Hello from comment route!');
});

module.exports = router; 