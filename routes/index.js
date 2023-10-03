const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/professor', require('./professor'));
router.use('/student', require('./student'));

module.exports = router;