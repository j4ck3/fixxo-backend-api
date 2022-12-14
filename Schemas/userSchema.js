const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    firstName: {type: String, required: [true, 'Name is required']},
    lastName: {type: String, required: [true, 'Last name is required']},
    email: {type: String, required: [true, 'Email is required'], unique: true},
    password: {type: String, required: [true, 'Password is required']},
})

module.exports = mongoose.model("users", userSchema)