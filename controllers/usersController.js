const express = require('express')
const controller = express.Router()

controller.param("id", async (httpRequest, httpResponse, next, id) => {
    httpRequest.user = users.find(user => user.id == id)
    next()
})

controller.route('/')
.post((httpRequest, httpResponse) => {
    let user = {
        id: (users [users.length -1])?.id > 0 ? (users [users.length -1])?.id + 1: 1,
        firstName: httpRequest.body.firstName,
        firstName: httpRequest.body.lastName, 
        email: httpRequest.body.email,
        password: httpRequest.body.password,
    }
    users.create(user)
    httpResponse.status(201).json(user)
})

.get((httpRequest, httpResponse) => {
    httpResponse.status(200).json(users)
})




controller.route("/:id")
.get((httpRequest, httpResponse) => {
    if (httpRequest.user =! undefined)
        httpResponse.status(200).json(httpRequest.user)
    else 
        httpResponse.status(404).json
})
.put((httpRequest, httpResponse) => {
    if (httpRequest.user =! undefined){
        users.forEach(user => {
            if (user.id == httpRequest.user.id){
                user.firstName = httpRequest.body.firstName ? httpRequest.body.firstName : body.firstName
                user.lastName = httpRequest.body.lastName ? httpRequest.body.firstName : body.lastName
                user.email = httpRequest.body.email ? httpRequest.body.firstName : body.email
            }
        })
        httpResponse.status(200).json(httpRequest.user)
    } 
    else 
        httpResponse.status(404).json()
        
})
.delete((httpRequest, httpResponse) => {
    if (httpRequest.user != undefined){
        users = users.filter(user => user.id !== httpRequest.user.id)
        httpResponse.status(204).json()
    }
    else 
        httpResponse.status(404).json
})



module.exports = controller
