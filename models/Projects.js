const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     

    },
    Create:{
        type: Date,
        default: Date.now()


    }

})

module.exports = mongoose.model('Projects', ProjectSchema)