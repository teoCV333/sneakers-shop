const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userService.deleteUser(productId);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}


module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};