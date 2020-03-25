/**
* Node, Mongo, GraphQL - Starter Kit
* https://github.com/eduard-kirilov/Online-store-5-api-products
* Copyright (c) 2020 Eduard Kirilov | MIT License
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String },
    subtitle: { type: String },
    url: { type: String },
})

module.exports = mongoose.model('Product', ProductSchema)