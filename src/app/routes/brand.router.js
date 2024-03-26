const express = require('express');
const brandController = require('../controllers/brand.controller');

class BrandRouter {

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {

        /**
         * @swagger
         * components:
         *  schemas: 
         *   Brand:
         *    type: object
         *    properties:
         *     name:
         *      type: string
         *      description: the brand name
         *      example: Under Armour
         *    required:
         *     - name
         */

        /**
         * @swagger
         * /brands:
         *   get:
         *     summary: returns all brands
         *     tags: [Brand]
         *     responses:
         *       200:
         *         description: all brands
         *         content:
         *             application/json:
         *                 schema:
         *                     type: array
         *                     items:
         *                         $ref: '#/components/schemas/Brand'
         */
        this.router.get('/', brandController.getAllBrands);


        /**
         * @swagger
         * /brands/{brandName}:
         *   get:
         *     summary: return a brand by name
         *     tags: [Brand]
         *     parameters:
         *       - in: path
         *         name: brandName
         *         schema:
         *           type: string
         *         required: true
         *         description: the brand name
         *         example: Under Armour
         *     responses:
         *       200:
         *         description: return a brand
         *         content:
         *             application/json:
         *                 schema:
         *                     type: object
         *                     $ref: '#/components/schemas/Brand'
         *       404:
         *         description: Brand not found
         */
        this.router.get('/:brandName', brandController.getBrandByName);


        /**
         * @swagger
         * /brands:
         *   post:
         *     summary: create a new brand
         *     tags: [Brand]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Brand'
         *     responses:
         *       200:
         *         description: new brand created.
         */
        this.router.post('/', brandController.createBrand);


        /**
         * @swagger
         * /brands/{id}:
         *   put:
         *     summary: update a brand
         *     tags: [Brand]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: the brand id
         *         example: 649d17f922ea778d73f7810e
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Brand'
         *     responses:
         *       200:
         *         description: update a brand
         *         content:
         *             application/json:
         *                 schema:
         *                     type: object
         *                     $ref: '#/components/schemas/Brand'
         *       404:
         *         description: Brand not found
         */
        this.router.put('/:id', brandController.updateBrand);


        /**
         * @swagger
         * /brands/{id}:
         *   delete:
         *     summary: delete a brand
         *     tags: [Brand]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: string
         *         required: true
         *         description: the brand id
         *         example: 649d17f922ea778d73f7810e
         *     responses:
         *       200:
         *         description: delete a brand
         *         content:
         *             application/json:
         *                 schema:
         *                     type: object
         *                     $ref: '#/components/schemas/Brand'
         *       404:
         *         description: Brand not found
         */
        this.router.delete('/:id', brandController.deleteBrand);

    }
 
    getRouter() {
        return this.router;
    }
}


module.exports = new BrandRouter().getRouter();