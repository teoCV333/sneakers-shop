const Brand = require('../models/brand.model');

const getAllBrands = async () => {
    try {
        return await Brand.find();
    } catch (error) {
        throw new Error(error.message);
    }
}

const getBrandByName = async (brandName) => {
    try {
        const regex = new RegExp(brandName, 'i');
        return await Brand.find({ name: regex });
    } catch (error) {
        throw new Error(error.message);
    }
}

const createBrand = async (brandData) => {
    try {
        const existingBrand = await Brand.findOne({ name: brandData.name });
        if (existingBrand) {
            throw new Error('A product with that name already exists in the database.');
        }
        const newBrand = new Brand(brandData);
        return await newBrand.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateBrand = async (brandId, brandData) => {
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(brandId, brandData, { new: true });
        if (!updatedBrand) {
            throw new Error('Brand not found');
        }
        return updatedBrand;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteBrand = async (brandId) => {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(brandId);
        if (!deletedBrand) {
            throw new Error('Brand not found');
        }
        return deletedBrand;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllBrands,
    getBrandByName,
    createBrand,
    updateBrand,
    deleteBrand
};