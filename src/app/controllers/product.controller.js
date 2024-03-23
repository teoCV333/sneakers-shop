const productService = require('../services/product.service');
const { returnResponse } = require('../util/genericResponse/genericResponseHandler');

const getAllProducts = async (req, res) => {
    const data = await productService.getAllProducts();

    const response = await returnResponse(data);
    res.status(response.httpStatusCode).json(response);
}

const getProductByName = async (req, res) => {
    const productName = req.params.productName;
    const data = await productService.getProductByName(productName);

    const response = await returnResponse(data);
    res.status(response.httpStatusCode).json(response);
}

const createProduct = async (req, res) => {
    const productData = req.body;
    const data = await productService.createProduct(productData);

    const response = await returnResponse(data);
    res.status(response.httpStatusCode).json(response);
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    const data = await productService.updateProduct(productId, productData);

    const response = await returnResponse(data);
    res.status(response.httpStatusCode).json(response);
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const data = await productService.deleteProduct(productId);

    const response = await returnResponse(data);
    res.status(response.httpStatusCode).json(response);
}

module.exports = { getAllProducts, getProductByName, createProduct, updateProduct, deleteProduct };