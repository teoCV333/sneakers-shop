const mongoose = require('mongoose');

class Product {
    constructor() {
        this.initSchema();
    }

    initSchema() {
        const productSchema = mongoose.Schema({
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
        this.Model = mongoose.model('Product', productSchema);
    }

    getModel() {
        return this.Model;
    }
}


module.exports = new Product();