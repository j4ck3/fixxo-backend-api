const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema} = graphql
const Vendor = require('../mongoDb/vendorSchema');
const Product = require('../mongoDb/productSchema');



const VendorType = new GraphQLObjectType({
    name: 'Vendor',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve (parent, args) {
                return Product.find({ vendorId: parent._id})
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        tag: { type: GraphQLString },
        rating: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        imageName: { type: GraphQLString },
        vendor: {
            type: VendorType,
            resolve (parent, args) {
                return Vendor.findById(parent.vendorId)
            }
        }
    })
})

const RootQurey = new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        vendor: {
            type: VendorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return  Vendor.findById(args.id)
            }
        },
        vendors: {
            type: new GraphQLList(VendorType),
            resolve(parent, args) {
                return  Vendor.find({})
            }
        },

        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return  Product.findById(args.id)
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return  Product.find({})
            }
        },

        productsByTag: {
            type: new GraphQLList (ProductType),
            args: { tag: { type: GraphQLString }},
            resolve(parent, args) {
                return Product.find({tag: args.tag}).limit(8)
            }
        },

        productsByCategory: {
            type: new GraphQLList (ProductType),
            args: { category: { type: GraphQLString }},
            resolve(parent, args) {
                return Product.find({category: args.category})
            }
        },

        productsByRating: {
            type: new GraphQLList (ProductType),
            args: { rating: { type: GraphQLString }},
            resolve(parent, args) {
                return Product.find({rating: args.rating})
            }
        }

    }
})

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addVendor: {
            type: VendorType,
            args: {
                name: { type: GraphQLString}
            },
            resolve (parent, args) {
                const vendor = new Vendor({
                    name: args.name
                })
                return vendor.save()
            }
        },

        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString},
                price: { type: GraphQLString }, 
                tag: { type: GraphQLString},
                rating: { type: GraphQLString},
                category: { type: GraphQLString},
                description: { type: GraphQLString},
                imageName: { type: GraphQLString},
                vendorId: { type: GraphQLID}
            },
            resolve (parent, args) {
                const product = new Product({
                    name: args.name,
                    price: args.price,
                    tag: args.tag,
                    rating: args.rating,
                    category: args.category,
                    description: args.description,
                    imageName: args.imageName,
                    vendorId: args.vendorId
                })
                return product.save()
            }
        },

        updateProduct: {
            type: ProductType,
            args: { 
                id: { type: GraphQLID},
                name: { type: GraphQLString},
                price: { type: GraphQLString }, 
                tag: { type: GraphQLString},
                rating: { type: GraphQLString},
                category: { type: GraphQLString},
                description: { type: GraphQLString},
                imageName: { type: GraphQLString},
                vendorId: { type: GraphQLID}
            },
            resolve (parent, args) {
                return Product.findByIdAndUpdate({_id: args.id}, {
                    name: args.name,
                    price: args.price,
                    tag: args.tag,
                    rating: args.rating,
                    category: args.category,
                    description: args.description,
                    imageName: args.imageName,
                    vendorId: args.vendorId
                }, { new: true })
            }
        },

        deleteProduct: {
            type: ProductType,
            args: { id: { type: GraphQLID}},
            resolve (parent, args) {
                return Product.findByIdAndRemove({_id: args.id})
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQurey,
    mutation: Mutations
})
