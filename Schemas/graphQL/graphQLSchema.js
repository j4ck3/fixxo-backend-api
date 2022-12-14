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
        _id: { type: GraphQLID},
        name: { type: GraphQLString},
        price: { type: GraphQLString }, // ändra price till string istället för nummer
        tag: { type: GraphQLString},
        rating: { type: GraphQLString},
        category: { type: GraphQLString},
        description: { type: GraphQLString},
        imageName: { type: GraphQLString},
        vendor: {
            type: VendorType,
            resolve (parent, args) {
                return Vendor.findById(parent.vendorId)
            }
        }
    })
})

const RootQurey = new GraphQLObjectType({
    name: 'RootQureyType',
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
                return  Vendor.findById(args.id)
            }
        },
        products: {
            type: ProductType,
            resolve(parent, args) {
                return  Vendor.find({})
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
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQurey,
    mutation: Mutations
})
