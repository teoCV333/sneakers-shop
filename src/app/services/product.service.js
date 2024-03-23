const { default: mongoose } = require('mongoose');
const Brand = require('../models/brand.model');
const Product = require('../models/product.model');

class ProductService {
    getAllProducts = async () => {
        try {
            const products = await Product.find({ inStock: true }).populate('brand');
            if (!products) {
                return {
                    isError: false,
                    data: []
                };
            }
            return {
                isError: false,
                data: products
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: "Internal server error"
            };
        }
    };

    getProductByName = async (productName) => {
        try {
            const product = await Product.findOne({ name: productName });
            if (!product) {
                return {
                    isError: true,
                    codeError: 404,
                    message: "Product not found"
                };
            }
            return {
                isError: false,
                data: product
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `Internal server error ${error}`
            };
        }
    };

    createProduct = async (productData) => {
        try {
            const productValidation = await this.validateProduct(productData.name);
            if (productValidation.isError) {
                return productValidation;
            }

            const brandValidation = await this.validateBrand(productData.brand);
            if (brandValidation.isError) {
                return brandValidation;
            }

            const newProduct = new Product(productData);
            await newProduct.save();
            return {
                isError: false,
                data: newProduct
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `Internal server error ${error}`
            };
        }
    };

    updateProduct = async (productId, productData) => {
        try {

            if (productData.name) {
                const productValidation = await this.validateProduct(productData.name);
                if (productValidation.isError) {
                    return productValidation;
                }
            }
            if (productData.brand) {

                const brandValidation = await this.validateBrand(productData.brand);
                if (brandValidation.isError) {
                    return brandValidation;
                }

            }

            const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
            if (!updatedProduct) {
                return {
                    isError: true,
                    codeError: 404,
                    message: "Product not found"
                };
            }
            return {
                isError: false,
                data: updatedProduct
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `Internal server error ${error}`
            };
        }
    };

    deleteProduct = async (productId) => {
        try {

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return {
                    isError: true,
                    codeError: 400,
                    message: "Invalid brand ID format."
                };
            }

            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return {
                    isError: true,
                    codeError: 404,
                    message: "Product not found"
                };
            }
            return {
                isError: false,
                data: deletedProduct
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `Internal server error ${error}`
            };
        }
    };

    validateProduct = async (productName) => {
        try {
            const existingProduct = await Product.findOne({ name: productName });
            if (existingProduct) {
                return {
                    isError: true,
                    codeError: 404,
                    message: "Product already exist."
                };
            }
            return {
                isError: false,
                data: existingProduct
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `Internal server error ${error.message}`
            };
        }
    };

    validateBrand = async (brandId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(brandId)) {
                return {
                    isError: true,
                    codeError: 400,
                    message: "Invalid brand ID format."
                };
            }

            const existingBrand = await Brand.findById(brandId);
            if (!existingBrand) {
                return {
                    isError: true,
                    codeError: 404,
                    message: 'No brand found with that ID.'
                };
            }

            return {
                isError: false,
                data: existingBrand
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `Internal server error ${error.message}`
            };
        }
    };
}

module.exports = new ProductService();