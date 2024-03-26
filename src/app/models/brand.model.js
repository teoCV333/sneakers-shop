const mongoose = require('mongoose');

class Brand {
    constructor() {
        this.initSchema();
    }

    initSchema() {
        const brandSchema = mongoose.Schema({
            name: {
                type: String,
                required: true,
            }
        });

        this.Model = mongoose.model('Brand', brandSchema);
    }

    getModel() {
        return this.Model;
    }
}


module.exports = new Brand();