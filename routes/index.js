const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Professor']
    res.send('Professor');
});

router.use('/professor', require('./professor'));

module.exports = router;