const mongoose = require('mongoose');

var pSchema = new mongoose.Schema({
    pass:{type:String,required:true,minlength:5}
})

var aPassword = mongoose.model('aPassword', pSchema);

module.exports = aPassword;