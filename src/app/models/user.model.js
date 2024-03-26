const mongoose = require('mongoose');

class User {
    constructor() {
        this.initSchema();
    }

    initSchema() {

        const priceSchema = mongoose.Schema({
            nombre_producto: {
                type: String,
                required: true
            },
            precio_especial_personal: {
                type: Number,
                required: true
            }
        });

        const userSchema = mongoose.Schema({
            nombre: {
                type: String,
                required: true
            },
            metadata: {
                required: false,
                type: {
                    precios_especiales: [priceSchema]
                }
            }
        });

        this.Model = mongoose.model('User', userSchema);

    }

    getModel() {
        return this.Model;
    }
}


module.exports = new User();