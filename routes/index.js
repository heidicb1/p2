const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {res.send('Welcome');});
router.use('/professor', require('./professor'));
router.use('/student', require('./student'));

module.exports = router;