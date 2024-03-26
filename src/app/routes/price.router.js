const express = require('express');
const priceController = require('../controllers/price.controller');

class PriceRouter {

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @swagger
         * components:
         *  schemas: 
         *   Price:
         *    type: number
         */


        /**
         * @swagger
         * /price/{id}/{productName}:
         *   get:
         *     summary: validate if a user have a special price for a product
         *     tags: [Price]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: the user ID
         *         example: 64948f587d5945d973d611d3
         *       - in: path
         *         name: productName
         *         schema:
         *           type: string
         *         required: true
         *         description: the product name
         *         example: Under Armour HOVR Sonic
         *     responses:
         *       200:
         *         description: return a price
         *         content:
         *             application/json:
         *                 schema:
         *                     type: number
         *       404:
         *         description: User or product not found
         */
        this.router.get('/:id/:productName', priceController.validatePrice);
        this.router.put('/discount/:id', priceController.addSpecialPrice);
        this.router.delete('/discount/:id/:productName', priceController.deleteSpecialPriceById);
    }

    getRouter() {
        return this.router;
    }

}


module.exports = new PriceRouter().getRouter();