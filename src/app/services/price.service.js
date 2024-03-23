const productService = require('./product.service');
const userService = require('./user.service');

const validatePrice = async (userId, productName) => {
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        const product = await productService.getProductByName(productName);
        if (!product || product.length === 0) {
            throw new Error(`Product "${productName}" not found`);
        }
        
        const metadata = user.metadata?.precios_especiales || [];

        let price = product[0].basePrice;

        metadata.forEach(data => {
            if (data.nombre_producto === productName) {
                price = data.precio_especial_personal;
            }
        });

        return price;
    } catch (error) {
        throw new Error(`Error validating price: ${error.message}`);
    }
}

const addSpecialPrice = async (userId, specialPriceData) => {
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        const product = await productService.getProductByName(specialPriceData.nombre_producto);
        if (!product || product.length === 0) {
            throw new Error(`Product "${specialPriceData.nombre_producto}" not found`);
        }

        const existingSpecialPrice = user.metadata?.precios_especiales.find(price => price.nombre_producto === specialPriceData.nombre_producto);
        if (existingSpecialPrice) {
            throw new Error(`User already has a special price for product "${specialPriceData.nombre_producto}"`);
        }

        user.metadata = user.metadata || {};
        user.metadata.precios_especiales = user.metadata.precios_especiales || [];
        user.metadata.precios_especiales.push(specialPriceData);
        
        await user.save();

        return user;
    } catch (error) {
        throw new Error(`error adding special price: ${error.message}`);
    }
}

const deleteSpecialPriceById = async (userId, productName) => {
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        if (!user.metadata || !user.metadata.precios_especiales || user.metadata.precios_especiales.length === 0) {
            throw new Error(`User does not have any special prices`);
        }

        const indexToRemove = user.metadata.precios_especiales.findIndex(price => price.nombre_producto === productName);
        if (indexToRemove === -1) {
            throw new Error(`User does not have a special price for product "${productName}"`);
        }

        user.metadata.precios_especiales.splice(indexToRemove, 1);

        await user.save();

        return user;
    } catch (error) {
        throw new Error(`Error removing special price: ${error.message}`);
    }
}


module.exports = {
    validatePrice,
    addSpecialPrice,
    deleteSpecialPriceById
};