const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const controller = express.Router()
const userSchema = require('../Schemas/userSchema')
const { generateAccessToken } = require('../middlewares/auth')

controller.route('/signup').post(async (req, res) => {
     const {firstName, lastName, email, password} = req.body

    if (!firstName || !lastName || !email || !password)
            res.status(400).json({text: 'Please fill in the the fields.'})

    const exists = await userSchema.findOne({email})
    if (exists)
        res.status(409).json({text: 'A user with the same Email already exists.'})
    else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userSchema.create({
            firstName, 
            lastName, 
            email, 
            password: hashedPassword
        })
        if (user) 
            res.status(201).json({text: 'Your accout was created.'})
        else 
            res.status(400).json({text: 'Something went wrong. We could not register you right now.'})
    }
})


controller.route('/signin').post(async (req, res) => {
    const {email, password} = req.body

    if (!email || !password)
        res.status(400).json({text: 'Please fill in the the fields.'})

    const user = await userSchema.findOne({email})

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            text: 'Login successfull!',
            accessToken: generateAccessToken(user._id)
        })

    } else {
        res.status(400).json({text: 'The email or password is incorrect.'})
    }


})

module.exports = controller