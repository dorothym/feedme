'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/meals', require('./meals'));
router.use('/chefs', require('./chefs'));
router.use('/buyers', require('./buyers'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
