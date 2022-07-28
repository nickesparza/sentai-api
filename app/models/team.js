const mongoose = require('mongoose')
const { Schema, model } = mongoose

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
    },
    colors: {
        type: Array,
        required: true
    },
    memberCount: Number,
    series: {
        type: Number,
        unique: true
    }
})

module.exports = model('Team', teamSchema)