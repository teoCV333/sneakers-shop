const priceService = require('../services/price.service');

const validatePrice = async (req, res) => {
    try {
        const userId = req.params.id;
        const productName = req.params.productName;
        const price = await priceService.validatePrice(userId, productName);
        res.status(200).json(price);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const addSpecialPrice = async (req, res) => {
    try {
        const userId = req.params.id;
        const specialPriceData = req.body;
        const specialPrice = await priceService.addSpecialPrice(userId, specialPriceData);
        res.status(200).json(specialPrice);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const deleteSpecialPriceById = async (req, res) => {
    try {
        const userId = req.params.id;
        const productName = req.params.productName;
        const specialPriceDeleted = await priceService.deleteSpecialPriceById(userId, productName);
        res.status(200).json(specialPriceDeleted);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}


module.exports = {validatePrice, addSpecialPrice, deleteSpecialPriceById};