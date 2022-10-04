const express = require('express');
const router = express.Router();
const cc = console.log;

router.get('/', (res, req, next) => {
    next();
});

module.exports = router;
