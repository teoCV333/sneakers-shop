const productService = require('../services/product.service');

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const getProductByName = async (req, res) => {
    try {
        const productName = req.params.productName;
        const product = await productService.getProductByName(productName);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const updatedProduct = await productService.updateProduct(productId, productData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

module.exports = {getAllProducts, getProductByName, createProduct, updateProduct, deleteProduct};