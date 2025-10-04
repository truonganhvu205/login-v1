const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug)

const Auth = new Schema({
    username: {type: String,},
    password: {type: String,},
    refreshToken: {type: String,},
    // slug: {type: String, slug: 'name', slug_padding_size: 4,  unique: true},
}, {
    timestamps: true,
})

module.exports = mongoose.model('Auth', Auth)
