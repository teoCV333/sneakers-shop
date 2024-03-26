const productService = require('./product.service');
const userService = require('./user.service');

class PriceService {

    validatePrice = async (userId, productName) => {
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User with ID ${userId} not found`
                };
            }

            const product = await productService.getProductByName(productName);
            if (!product || product.length === 0) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `Product "${productName}" not found`
                };
            }

            const metadata = user.metadata?.precios_especiales || [];

            let price = product.data.basePrice;

            metadata.forEach(data => {
                if (data.nombre_producto === productName) {
                    price = data.precio_especial_personal;
                }
            });

            return {
                isError: false,
                data: price
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(PriceService): Error validating price: ${error.message}`
            };
        }
    }

    addSpecialPrice = async (userId, specialPriceData) => {
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User with ID ${userId} not found`
                };
            }

            const product = await productService.getProductByName(specialPriceData.nombre_producto);
            if (!product || product.length === 0) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `Product "${specialPriceData.nombre_producto}" not found`
                };
            }

            const existingSpecialPrice = user.metadata?.precios_especiales.find(price => price.nombre_producto === specialPriceData.nombre_producto);
            if (existingSpecialPrice) {
                return {
                    isError: true,
                    codeError: 409,
                    message: `User already has a special price for product ${specialPriceData.nombre_producto}`
                };
            }

            user.metadata = user.metadata || {};
            user.metadata.precios_especiales = user.metadata.precios_especiales || [];
            user.metadata.precios_especiales.push(specialPriceData);

            await user.save();

            return {
                isError: false,
                data: user
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(PriceService): error adding special price: ${error.message}`
            };
        }
    }

    deleteSpecialPriceById = async (userId, productName) => {
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User with ID ${userId} not found`
                };
            }

            if (!user.metadata || !user.metadata.precios_especiales || user.metadata.precios_especiales.length === 0) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User does not have any special prices`
                };
            }

            const indexToRemove = user.metadata.precios_especiales.findIndex(price => price.nombre_producto === productName);
            if (indexToRemove === -1) {
                return {
                    isError: true,
                    codeError: 404,
                    message: `User does not have a special price for product "${productName}"`
                };
            }

            user.metadata.precios_especiales.splice(indexToRemove, 1);

            await user.save();

            return {
                isError: false,
                data: user
            };
        } catch (error) {
            return {
                isError: true,
                codeError: 500,
                message: `(PriceService): Internal server error: ${error}`
            };
        }
    }
}


module.exports = new PriceService();