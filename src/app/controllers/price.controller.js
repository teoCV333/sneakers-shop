const priceService = require('../services/price.service');
const { returnResponse } = require('../util/genericResponse/genericResponseHandler');

class PriceController {

    validatePrice = async (req, res) => {
        const userId = req.params.id;
        const productName = req.params.productName;
        const data = await priceService.validatePrice(userId, productName);
        const response = await returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    addSpecialPrice = async (req, res) => {
        const userId = req.params.id;
        const specialPriceData = req.body;
        const data = await priceService.addSpecialPrice(userId, specialPriceData);
        const response = await returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    deleteSpecialPriceById = async (req, res) => {
        const userId = req.params.id;
        const productName = req.params.productName;
        const data = await priceService.deleteSpecialPriceById(userId, productName);
        const response = await returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

}

module.exports = new PriceController();