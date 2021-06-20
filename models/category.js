const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

const CategoryModel = new mongoose.model('Category', CategorySchema)

module.exports = CategoryModel;