const User = require('../models/user.model');

class UserService {
    
    getAllUsers = async () => {
        try {
            const users = await User.Model.find();
            if(!users || users.length == 0) {
                return {
                    isError: false,
                    data: []
                }
            }
            return {
                isError: false,
                data: users
            }
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(UserService): Internal server error: ${error}` 
            }
        }
    }
    
    getUserById = async (userId) => {
        try {
            const user = await User.Model.findById(userId);
            if(!user) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User with ID ${userId} not found`
                }
            }
            return {
                isError: false,
                data: user
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(UserService): Internal server error: ${error}` 
            }
        }
    }
    
    createUser = async (userData) => {
        try {
            const newUser = new User.Model(userData);
            await newUser.save();
            return {
                isError: false,
                data: newUser
            }
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(UserService): Internal server error: ${error}` 
            }
        }
    }
    
    updateUser = async (userId, userData) => {
        try {
            const updatedUser = await User.Model.findByIdAndUpdate(userId, userData, { new: true });
            if (!updatedUser) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User with ID ${userId} not found`
                }
            }
            return {
                isError: false,
                data: updatedUser
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(UserService): Internal server error: ${error}` 
            }
        }
    }
    
    deleteUser = async (userId) => {
        try {
            const deletedUser = await User.Model.findByIdAndDelete(userId);
            if (!deletedUser) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User with ID ${userId} not found`
                }
            }
            return {
                isError: false,
                data: deletedUser
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(UserService): Internal server error: ${error}` 
            }
        }
    }
}

module.exports = new UserService();