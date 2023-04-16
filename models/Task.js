const mongoose = require('mongoose')

const TareaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    create: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    },

})

module.exports = mongoose.model('Task', TareaSchema)