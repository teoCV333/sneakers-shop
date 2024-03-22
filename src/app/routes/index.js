const express = require('express');
const router = express.Router();
const productRoutes = require('./product.routes');
const brandRoutes = require('./brand.routes');
const userRoutes = require('./user.routes');
const priceRoutes = require('./price.routes');

router.use('/products', productRoutes);
router.use('/brands', brandRoutes);
router.use('/users', userRoutes);
router.use('/price', priceRoutes)

module.exports = router;