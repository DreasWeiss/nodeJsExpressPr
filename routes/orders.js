const { Router } = require('express');
const Order = require('../models/order');
const router = Router();

router.get('/', async (req, res) => {
    res.render('orders', {
        title: "Orders",
        isOrders: true
    });
});

router.post('/', async (req, res) => {
    res.redirect('/orders');
});

module.exports = router;