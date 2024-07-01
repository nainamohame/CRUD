const mongoose = require('mongoose')

const formModel = mongoose.Schema({
    rationaleSummary: {
        type: String
    },
    rationaleText: {
        type: String
    },
    enable: {
        type: Boolean
    },
    groupID: {
        type: Number,
        unique: true
    },
    sequence: {
        type: Number,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Form', formModel)