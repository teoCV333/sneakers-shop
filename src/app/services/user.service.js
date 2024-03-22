const User = require('../models/user.model');

const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.find({id: userId});
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};