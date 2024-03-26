const productService = require('../services/product.service');
const GenericResponseHandler = require('../util/genericResponse/genericResponseHandler');
const { returnResponse } = require('../util/genericResponse/genericResponseHandler');

class ProductController {

    constructor() {
        this.responseHandler = new GenericResponseHandler();
    }

    getAllProducts = async (req, res) => {
        const data = await productService.getAllProducts();
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    getProductByName = async (req, res) => {
        const productName = req.params.productName;
        const data = await productService.getProductByName(productName);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    createProduct = async (req, res) => {
        const productData = req.body;
        const data = await productService.createProduct(productData);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    updateProduct = async (req, res) => {
        const productId = req.params.id;
        const productData = req.body;
        const data = await productService.updateProduct(productId, productData);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    deleteProduct = async (req, res) => {
        const productId = req.params.id;
        const data = await productService.deleteProduct(productId);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

}

module.exports = new ProductController();