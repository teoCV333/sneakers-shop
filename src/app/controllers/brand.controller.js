const brandService = require('../services/brand.service');
const GenericResponseHandler = require('../util/genericResponse/genericResponseHandler');

class BrandController {

    constructor() {
        this.responseHandler = new GenericResponseHandler();
    }

    getAllBrands = async (req, res) => {
        const data = await brandService.getAllBrands();
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    getBrandByName = async (req, res) => {
        const brandName = req.params.brandName;
        const data = await brandService.getBrandByName(brandName);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    createBrand = async (req, res) => {
        const brandData = req.body;
        const data = await brandService.createBrand(brandData);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    updateBrand = async (req, res) => {
        const brandId = req.params.id;
        const brandData = req.body;
        const data = await brandService.updateBrand(brandId, brandData);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    deleteBrand = async (req, res) => {
        const brandId = req.params.id;
        const data = await brandService.deleteBrand(brandId);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

}

module.exports = new BrandController();