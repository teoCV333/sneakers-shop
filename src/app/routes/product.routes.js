const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

/**
 * @swagger
 * components:
 *  schemas: 
 *   Product:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      description: the product model name
 *      example: Under Armour HOVR Sonic
 *     inStock:
 *      type: boolean
 *      description: indicates if the product is available
 *      example: true
 *     basePrice:
 *      type: number
 *      description: the base price of product
 *      example: 20
 *     brand:
 *      type: string
 *      description: unique ID for a existing brand
 *      example: 649d17f922ea778d73f7810e   
 *    required:
 *     - name
 *     - inStock
 *     - basePrice
 *     - brand
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: returns all products that are in stock
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: products in stock
 *         content:
 *             application/json:
 *                 schema:
 *                     type: array
 *                     items:
 *                         $ref: '#/components/schemas/Product'
 */

router.get('/', productController.getAllProducts);


/**
 * @swagger
 * /products/{productName}:
 *   get:
 *     summary: return a product by name
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productName
 *         schema:
 *           type: string
 *         required: true
 *         description: the product name
 *         example: Under Armour HOVR Sonic
 *     responses:
 *       200:
 *         description: return a product
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: product not found
 */

router.get('/:productName', productController.getProductByName);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: new product created.
 */
router.post('/', productController.createProduct);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the product id
 *         example: 65fef2d9fcd02e804624743b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: update a product
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: product not found
 */

router.put('/:id', productController.updateProduct);


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the product id
 *         example: 65fcf8292591c7f969edb854
 *     responses:
 *       200:
 *         description: delete a product
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: product not found
 */

router.delete('/:id', productController.deleteProduct);

module.exports = router;