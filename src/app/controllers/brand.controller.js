const brandService = require('../services/brand.service');

const getAllBrands = async (req, res) => {
    try {
        const brands = await brandService.getAllBrands();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const getBrandByName = async (req, res) => {
    try {
        const brandName = req.params.brandName;
        const brand = await brandService.getBrandByName(brandName);
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const createBrand = async (req, res) => {
    try {
        const brandData = req.body;
        const newBrand = await brandService.createBrand(brandData);
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const brandData = req.body;
        const updatedBrand = await brandService.updateBrand(brandId, brandData);
        res.status(200).json(updatedBrand);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const deletedBrand = await brandService.deleteBrand(brandId);
        res.status(200).json(deletedBrand);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}


module.exports = {getAllBrands, getBrandByName, createBrand, updateBrand, deleteBrand};