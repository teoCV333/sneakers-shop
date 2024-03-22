const { default: mongoose } = require('mongoose');
const Brand = require('../models/brand.model');
const Product = require('../models/product.model');

const getAllProducts = async () => {
    try {
        return await Product.find({ inStock: true }).populate('brand');
    } catch (error) {
        throw new Error(error.message);
    }
}

const getProductByName = async (productName) => {
    try {
        const product = await Product.find({ name: productName });
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createProduct = async (productData) => {
    try {
        const existingProduct = await Product.findOne({ name: productData.name });
        if (existingProduct) {
            throw new Error('A product with that name already exists in the database.');
        }

        if (!mongoose.Types.ObjectId.isValid(productData.brand)) {
            throw new Error('Invalid brand ID format.');
        }

        const existingBrand = await Brand.findById(productData.brand);
        if (!existingBrand) {
            throw new Error('No brand found with that ID.');
        }


        const newProduct = new Product(productData);
        return await newProduct.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateProduct = async (productId, productData) => {
    try {

        if (productData.name) {
            const existingProduct = await Product.findOne({ name: productData.name });
            if (existingProduct) {
                throw new Error('A product with that name already exists in the database.');
            }
        }


        if (!mongoose.Types.ObjectId.isValid(productData.brand)) {
            throw new Error('Invalid brand ID format.');
        }

        const existingBrand = await Brand.findById(productData.brand);
        if (!existingBrand) {
            throw new Error('No brand found with that ID.');
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }
        return deletedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllProducts,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
};