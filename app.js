require('dotenv').config()
const port = process.env.API_PORT || 5000
const mongoDBConnection = require('./mongodb-server')
const { graphqlHTTP } = require('express-graphql')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: require('./schemas/graphQL/graphQLSchema'),
    graphiql: true
}))

app.use('/api/products', require('./controllers/productController'))
app.use('/api/authentication', require('./controllers/authenticationController'))
//app.use('/api/users', require('./controllers/usersController'))



app.listen(port, () => {
    console.log(port)
    mongoDBConnection()
})
