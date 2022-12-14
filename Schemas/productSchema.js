const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    description: {type: String},
    category: {type: String},
    price: {type: Number, required: true},
    tag: {type: String},
    rating: {type: Number},
    imageName: {type: String},    
})

module.exports = mongoose.model("products", productSchema)