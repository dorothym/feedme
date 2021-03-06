'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/meals', require('./meals'));
router.use('/chefs', require('./chefs'));
router.use('/users', require('./users'));
router.use('/ratings', require('./ratings'));
router.use('/transactions', require('./transactions'));

// router.use('/github', function(req, res, next) {
// 	res.redirect('https://github.com/dorothym/feedme')
// })


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
 });
