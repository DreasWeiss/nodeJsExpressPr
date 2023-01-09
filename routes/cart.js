const {Router} = require('express');
const Course = require('../models/course');
const Cart = require('../models/cart');
const router = Router();

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.params.id);
    await Cart.add(course);
    res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
    const cart = await Cart.fetch();
    res.render('cart', {
        title: 'Cart',
        cart
    });
});


module.exports = router;