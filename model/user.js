var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        require:true
    },
    jhola:{
        type:Array,
        default:null
    },
    admin:{
        type:Boolean,
        default:false

    }
})

var user = mongoose.model('user', userSchema);

module.exports = user;