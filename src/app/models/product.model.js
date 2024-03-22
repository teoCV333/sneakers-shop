const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    basePrice: {
        type: Number,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Brand', 
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;