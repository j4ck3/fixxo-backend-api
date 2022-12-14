const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        id: {type: mongoose.Schema.Types.ObjectId},
        name: {type: mongoose.Schema.Types.String, required: true},
        price: {type: mongoose.Schema.Types.String, required: true},
        tag: {type: mongoose.Schema.Types.String},
        rating: {type: mongoose.Schema.Types.String},
        category: {type: mongoose.Schema.Types.String, required: true},
        description: {type: mongoose.Schema.Types.String},
        imageName: {type: mongoose.Schema.Types.String},
        vendorId: {type: mongoose.Schema.Types.String, required: true}
    }
)

module.exports = mongoose.model('Product', productSchema)