const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String },
    subtitle: { type: String },
    url: { type: String },
})

module.exports = mongoose.model('Product', ProductSchema)