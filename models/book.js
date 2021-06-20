const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title : {
        type: String,
        unique: true,
        required : true
    },
    price: {
        type:Number,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        required: true
    },
    authors:{
        type:[String],
        required: true
    }
}, {timestamps: true})

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel