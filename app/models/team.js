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
    series: {
        type: Number,
        unique: true,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    JSON: { virtuals: true }
})

teamSchema.virtual('era').get(function () {
    if (this.series <= 12) {
        return 'Showa'
    } else if (this.series > 12 && this.series <= 43) {
        return 'Heisei'
    } else if (this.series > 43) {
        return 'Reiwa'
    } else {
        return 'Pre-Showa, somehow'
    }
})

teamSchema.virtual('memberCount').get(function () {
    return this.colors.length
})

module.exports = model('Team', teamSchema)