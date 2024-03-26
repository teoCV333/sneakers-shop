const express = require('express');
const userController = require('../controllers/user.controller');

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', userController.getAllUsers);
        this.router.get('/:id', userController.getUserById);
        this.router.post('/', userController.createUser);
        this.router.put('/:id', userController.updateUser);
        this.router.delete('/:id', userController.deleteUser);
    }

    getRouter() {
        return this.router;
    }

}

module.exports = new UserRouter().getRouter();