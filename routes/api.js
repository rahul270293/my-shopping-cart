var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../model/user');

const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const cartController = require('../controllers/cart');
var fetchProduct = require('../controllers/fetchProduct');
// var adminpass = require('../controllers/password');



var verifyTokenAPI = ((req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, 'keychabi')
        if (decode) {
            User.findById(decode.id).then((user) => {
                if (user) {
                    req.currentUser = user;
                    next();
                }
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: 'authentication failed'
        });
    }
})



/* GET users listing. */
// router.get('/products', adminController.products);

//admin
// router.post('/password',adminpass.apass)



//product 
router.get('/fetch-product',fetchProduct.fetchProducts);
router.post('/add-product',verifyTokenAPI, apiController.products);
router.post('/edit-products',verifyTokenAPI, apiController.updatedProduct);
router.post('/delete-products', verifyTokenAPI,apiController.deleteProduct);

//cart
router.post('/addCart',verifyTokenAPI, cartController.addCart);
router.post('/editCart', verifyTokenAPI,cartController.editCart);
router.get('/cart',verifyTokenAPI,cartController.fetchCart);





//user
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/signout',verifyTokenAPI, userController.signout);

module.exports = router;
