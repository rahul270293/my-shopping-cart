var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var user = require('../model/user');

var signup = ((req, res, next) => {
    var pro = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword
    })
    user.findOne({ email: pro.email }).then((response) => {
        console.log(response)
        if (!response) {
            if (pro.password == pro.cpassword) {
                pro.save().then((doc) => {
                    if (doc) {
                        res.send({ status: true, message: 'user saved' })
                    } else {
                        res.send({ status: false, message: 'user not saved' })
                    }
                })
            } else {
                res.send({ status: false, message: 'password not matched' })
            }
        } else {
            res.send({ status: false, message: 'email already exist' })
        }
    })
});


var signin = ((req, res, next) => {
    var nop = {
        email: req.body.email,
        password: req.body.password
    }
    user.findOne({ email: nop.email }).then((doc) => {
        // console.log("=============yha=============",doc.admin)
        if (doc.admin == true) {
            if (doc.password == nop.password) {
                const token = jwt.sign({ id: doc._id }, 'keychabi')
                res.cookie('jwtToken',[token,true])
                return res.json({ 
                    status: true, 
                    message: 'admin login successful', 
                    token: token,})
            } else {
                res.send({ status: false, message: 'password error' })
            }

        }
        else if (doc.admin == false) {
            if (doc.password == nop.password) {
                const token = jwt.sign({ id: doc._id }, 'keychabi')
                res.cookie('jwtToken',[token,true])
                return res.json({
                    status: true,
                    message: ' user login successfull',
                    token: token,
                    name: doc.name,
                    email: doc.email
                })
            } else {
                res.send({ status: true, message: 'incorrect password' })
            }
        } else {
            res.send({ status: false, message: 'please signup' })

        }
    })
})



var signout = ((req, res, next) => {
    // console.log('=====tera mera=====',req.cookies)
    // var token = jwt.sign({id:''},'keychabi')
    // req.cookies.remove('jwtToken')
    // console.log('ncncn--=======dkkdk',req.localStorage('jwtToken'))
    if(req.cookies.jwtToken != undefined){
        res.clearCookie('jwtToken')
       res.send({status:true, message:"logout successfull"})
    }
   

    // res.send({ status: true, message: "logout successfull" })
})









module.exports = { signup, signin, signout };