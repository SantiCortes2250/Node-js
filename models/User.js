const mongoose = require('mongoose')

const Users = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true

    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    password:{
        type: String,
        required: true,
        trim: true

    },
    register:{
        type: Date,
        dafault: Date.now()

    },
    image:{
        type: String,
        dafault: null

    }

})

module.exports = mongoose.model('User', Users)