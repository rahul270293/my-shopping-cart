var product = require('../model/product');
var user = require('../model/user');


exports.addCart = ((req,res,next)=>{
 const productId = req.body.productId;
 var jhola =[]
 user.findOne({email:req.currentUser.email}).then((user)=>{
     
     if(user){
         product.findById(productId).then((products)=>{
             
             if(products){
                 
                //  jhola.push(productId)
                //  user.jhola = jhola;
                //  user.save()
                 user.jhola.push(productId)
                 user.save()
                 res.send({status:true, message:'product add to cart'}); 
             }else{
                 res.send({status:false, message:'product not added to cart'})
             }
         })
     }
 })
})


exports.editCart =((req,res,next)=>{
    var productId = req.body.productId;

    user.findOne({email: req.currentUser.email}).then((user)=>{
        if(user){
            let value = productId;
            jhola = user.jhola.filter(item =>
                 item != value
                 )
                 console.log(jhola)
                user.jhola = jhola
            user.save()
            res.send({status:true, message:'Item deleted'})
        }
    })
})



exports.fetchCart =((req,res,next)=>{
    var detail = []
    user.findOne({email:req.currentUser.email})
    .then((user)=>{
        var jkkk = user.jhola;
        // console.log("==============",jkkk.length)
        for(i=0;i<jkkk.length;i++){
            var tera = jkkk[i]
            // console.log('=========tipptitp=====',tera)
            product.findById(tera).then((prod)=>{
                // console.log("=========",prod)
                if(prod){
                    detail.push(prod)
                    // console.log("=========",detail.length)
                }
                if(detail.length == jkkk.length){
                    res.send({status:true, data:detail,message:'add to cart'})
                }
                
                
            })
        }
        
     
        })
    
})



// module.exports = { addCart , editCart };