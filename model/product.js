const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    imageUrl:{type:String},
    description:{type:String}
});

var product = mongoose.model('product', productSchema);

module.exports = product;


