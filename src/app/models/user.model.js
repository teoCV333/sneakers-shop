// userPrice.model.js
const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
    nombre_producto: {
        type: String,
        required: true
    },
    precio_especial_personal: {
        type: Number,
        required: true
    }
});

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    metadata: {
        required: false,
        type: {
            precios_especiales: [PriceSchema]
        }
    }
});

const UserPrice = mongoose.model('User', UserSchema);

module.exports = UserPrice;