const express = require('express');
const router = express.Router();
const priceController = require('../controllers/price.controller');

router.get('/:id/:productName', priceController.validatePrice);
router.put('/discount/:id', priceController.addSpecialPrice);
router.delete('/discount/:id/:productName', priceController.deleteSpecialPriceById);

module.exports = router;