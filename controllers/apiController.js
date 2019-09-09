const mongoose = require('mongoose');

const product = require('../model/product')

var products = ((req, res, next) => {
    // console.log('lllllllll',req.body)
    var prds = new product({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    });
    
    prds.save().then((saved) => {
        if (saved) {
            // console.log(saved.imageUrl,'/////////////////////')
            res.send({ status: true, message: "product saved",imageUrl:saved.imageUrl })
        } else {
            res.send({ status: false, message: 'product not saved' })
        }
    }).catch((err) => {
        console.log(err);
    })

});


var updatedProduct = ((req, res, next) => {
    // console.log('nnnnnananananna',req.body)
    const updatedTitle = req.body.updatedTitle;
    const updatedPrice = req.body.updatedPrice;
    // const updatedImageUrl = req.body.updatedImageUrl;
    const updatedDescription = req.body.updatedDescription;


    product.findById(req.body.productId).then(product => {
    // console.log('asssasssssss',product.title)
        product.title = updatedTitle;
        product.price = updatedPrice;
        // product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;

        product.save().then((saved) => {
            console.log(product)
            if(saved){
                res.send({status:true, message:"product updated"});
            } else{
                res.send({status:false, message:"not updated"});
            }
        })
    })
        
        .catch(err => console.log(err));
});


var deleteProduct = ((req,res,next) => {
    const productId = req.body.productId;
    product.findOneAndDelete({_id:productId}).then((del)=>{
        if(del){
            res.send({status:true, message:'deleted'})
        }else{
            res.send({status:false, message:'not deleted'})
        }
    //     console.log(del);
    //     res.send('product deleted');
    // }).catch(err => console.log(err))

    })

});






module.exports = { products ,updatedProduct , deleteProduct} ;
