const Brand = require('../models/brand.model');

class BrandService {

    getAllBrands = async () => {
        try {
            const brands = await Brand.Model.find();
            if (!brands || brands.length == 0) {
                return {
                    isError: false,
                    data: []
                };
            }
            return {
                isError: false,
                data: brands
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(BrandService): Internal server error: ${error}`
            };
        }
    }

    getBrandByName = async (brandName) => {
        try {
            const regex = new RegExp(brandName, 'i');
            const brand = await Brand.Model.findOne({ name: regex });
            if (!brand) {
                return {
                    isError: true,
                    codeError: 404,
                    message: "Brand not found"
                };
            }
            return {
                isError: false,
                data: brand
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(BrandService): Internal server error: ${error}`
            };
        }
    }

    createBrand = async (brandData) => {
        try {
            const existingBrand = await Brand.Model.findOne({ name: brandData.name });
            if (existingBrand) {
                return {
                    isError: true,
                    codeError: 409,
                    message: "Brand already exist."
                };
            }
            const newBrand = new Brand.Model(brandData);
            await newBrand.save();
            return {
                isError: false,
                data: newBrand
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(BrandService): Internal server error: ${error}`
            };
        }
    }

    updateBrand = async (brandId, brandData) => {
        try {
            const updatedBrand = await Brand.Model.findByIdAndUpdate(brandId, brandData, { new: true });
            if (!updatedBrand) {
                return {
                    isError: true,
                    codeError: 404,
                    message: 'No brand found with that ID.'
                };
            }
            return {
                isError: false,
                data: updatedBrand
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(BrandService): Internal server error: ${error}`
            };
        }
    }

    deleteBrand = async (brandId) => {
        try {
            const deletedBrand = await Brand.Model.findByIdAndDelete(brandId);
            if (!deletedBrand) {
                return {
                    isError: true,
                    codeError: 404,
                    message: 'No brand found with that ID.'
                };
            }
            return {
                isError: false,
                data: deletedBrand
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(BrandService): Internal server error: ${error}`
            };
        }
    }

}

module.exports = new BrandService();