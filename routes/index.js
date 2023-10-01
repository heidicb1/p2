const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello World');});

router.use('/professor', require('./professor'));

module.exports = router;