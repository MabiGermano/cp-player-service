const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({text: 'hello world!'});
});

module.exports = router;