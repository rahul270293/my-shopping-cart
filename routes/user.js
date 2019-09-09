var express = require('express');
var router = express.Router();
var User = require('../model/user');

var jwt = require('jsonwebtoken')

/* GET home page. */
//token verification
 var verifyToken=((req,res,next)=>{
   console.log('========aaoge jab tum======',req.cookies.jwtToken)
   if(req.cookies.jwtToken !==undefined ){
  var token = req.cookies.jwtToken[0];
  // console.log('=============mdmdmdmdmdmdmmdmdmd========',token)
  if(token){
    const decode = jwt.verify(token, 'keychabi')
    // console.log('===========annnannana====',decode)
    if(decode){
      User.findById(decode.id).then((user)=>{
        // console.log('=============pepepeppepep',user)
        req.currentUser =user;
        return next()
      })
      
    }else{
      res.send({message:"authentication failed"})
    }

  }  
}else{
  res.redirect('/')
}

 })





//------

router.get('/', function(req, res, next) {
  res.render('index', { title: 'product' });
});


//get admin product page
router.get('/add-product',verifyToken, function(req,res,next){
  res.render('add-product',{title:'add-product'})
})

// main page product
router.get('/admin-product',verifyToken, function(req,res,next){
  res.render('product')
})

//cart
router.get('/cart',verifyToken,function(req,res,next){
  res.render('cart')
})

//userProduct
router.get('/userProduct',verifyToken, function(req,res,next){
  res.render('userProduct')
})

//checkout
router.get('/checkout',function(req,res,next){
  res.render('checkout')
})

//user
router.get('/signup',function(req,res,next){
  res.render('signup',{title:'signup'})
})

router.get('/signin',function(req,res,next){
  res.render('signin',{title:'signin'})
})


//admin password
// router.get('/apass',function(req,res,next){
//   res.render('password')
// })

module.exports = router;
