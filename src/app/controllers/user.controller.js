const userService = require('../services/user.service');
const GenericResponseHandler = require('../util/genericResponse/genericResponseHandler');
const { returnResponse } = require('../util/genericResponse/genericResponseHandler');

class UserController {

    constructor() {
        this.responseHandler = new GenericResponseHandler();
    }

    getAllUsers = async (req, res) => {
        const data = await userService.getAllUsers();
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    getUserById = async (req, res) => {
        const userId = req.params.id;
        const data = await userService.getUserById(userId);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    createUser = async (req, res) => {
        const userData = req.body;
        const data = await userService.createUser(userData);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    updateUser = async (req, res) => {
        const userId = req.params.id;
        const userData = req.body;
        const data = await userService.updateUser(userId, userData);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

    deleteUser = async (req, res) => {
        const userId = req.params.id;
        const data = await userService.deleteUser(productId);
        const response = await this.responseHandler.returnResponse(data);
        res.status(response.httpStatusCode).json(response);
    };

}


module.exports = new UserController();