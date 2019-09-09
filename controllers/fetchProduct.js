var product = require('../model/product')

var fetchProducts = ((req,res,next)=>{
    product.find()
    .then((resp)=>{
        console.log(resp)
        res.status(200).send({product:resp});
    })
    .catch(err => console.log(err))
});


module.exports = { fetchProducts };