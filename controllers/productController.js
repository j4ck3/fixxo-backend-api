/* const express = require('express')
const controller = express.Router()
const ProductSchema = require('../Schemas/productSchema')
const { authorize } = require('../middlewares/auth')

controller.route('/').get(async(req, res) => {
    const products = []
    const list = await ProductSchema.find()

    if (list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    }else
        res.status(404).json()
})

controller.route('/product/:articleNumber').get( async(req, res) => {
    const product = await ProductSchema.findById(req.params.id)
    if (product){
        res.status(200).json({
            articleNumber: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            tag: product.tag,
            imageName: product.imageName,
            rating: product.rating
        })
    }else
        res.status(404).json()
})

controller.route('/category/:category').get(async(req, res) => {
    const products = []
    const list = await ProductSchema.find({category: req.params.category})

    if (list){
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    }else
        res.status(404).json()
})

controller.route('/rating/:rating').get(async(req, res) => {
    const products = []
    const list = await ProductSchema.find({rating: req.params.rating})

    if (list){
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    }else
        res.status(404).json()
})

controller.route('/tag/:tag').get( async(req, res) => {
    const products = []
    const list = await ProductSchema.find({tag: req.params.tag})

    if (list){
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    }else
        res.status(404).json()
})


controller.route('/tag/:tag/:take').get(async (req, res) => {
    const products = []
    const list = await ProductSchema.find({tag: req.params.tag}).limit(req.params.take)
    if (list){
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    }else
        res.status(400).json()
})

// secured routes

//create
controller.route('/').post(authorize, async(req, res) => {
    const {name, description, price, category, tag, rating, imageName} = req.body

    if (!name || !price)
    res.status(400).json({text: 'Name & Price is required.'})

    const item_exists = await ProductSchema.findOne({name})
    if (item_exists)
        res.status(400).json({text: 'A Product with the same Name already exsits.'})
    else {
        const product = await ProductSchema.create({
            name,
            description,
            price, 
            category, 
            tag, 
            rating, 
            imageName   
        })
        if (product)
            res.status(200).json({text: `Product: ${product.name} was created.`})
        else
        res.status(400).json({text: 'Something went wrong. The product could not be created.'})
    }
})

//edit
controller.route('/edit/:articleNumber').post(authorize, async(req, res) => {
    const product = await ProductSchema.findById({tag: req.params.articleNumber})
    if (product){
        res.status(200).json({
            articleNumber: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            tag: product.tag,
            imageName: product.imageName,
            rating: product.rating
        })
    }else
        res.status(404).json()
    
    
    const {name, description, price, category, tag, rating, imageName} = req.body

    if (!name || !price)
    res.status(400).json({text: 'Name & Price is required.'})

    const item_exists = await ProductSchema.findOne({name})
    if (item_exists)
        res.status(400).json({text: 'A Product with the same Name already exsits.'})
    else {
        const product = await ProductSchema.create({
            name,
            description,
            category, 
            price, 
            tag, 
            rating, 
            imageName   
        })
        if (product)
            res.status(200).json({text: `Product: ${product.name} was created.`})
        else
        res.status(400).json({text: 'Something went wrong. The product could not be created.'})
    }
})

//delete
controller.route('/delete/:articleNumber').delete(authorize, async(req, res) => {
    if(!req.params.articleNumber)
        res.status(400).json({text: 'No article number was specified.'})
    else {
        const product = await ProductSchema.findById(req.params.articleNumber)
        if (product) {
            await ProductSchema.remove(item)
            res.status(200).json({text: `Product ${req.params.name} was deleted.`})
        } else {
            res.status(404).json({text: `Product ${req.params.name} was not found.`})
        }
    }
})

module.exports = controller */