const express = require('express');
const router = express.Router();
const productRouter = require('./product.router');
const brandRouter = require('./brand.router');
const userRouter = require('./user.router');
const priceRouter = require('./price.router');

router.use('/products', productRouter);
router.use('/brands', brandRouter);
router.use('/users', userRouter);
router.use('/price', priceRouter);

module.exports = router;