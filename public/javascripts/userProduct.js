function userProds(){
    var len='', title="",price="",imageUrl="",description="",html='';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/fetch-product')
    .then((resp)=>{
        // console.log('kuch bhi=======',resp.data.product)
        len = resp.data.product.length;
        // console.log('arraylength',len)
        for(i=0;i<len;i++){
            title = resp.data.product[i].title;
            price = resp.data.product[i].price;
            imageUrl = resp.data.product[i].imageUrl;
            description= resp.data.product[i].description;
            productId=resp.data.product[i]._id
            // console.log('jdhdhfhhfjkks',productId,price)
            // console.log('kkdkkdkd=====dkdkdkk',title,price,imageUrl,description,html)

            html+= `<tr>
                <td  contenteditable='false' class="row${i}" id="title${i}">${title}</td>
                <td contenteditable='false' class="row${i}" id="price${i}">${price}</td>
                <td class="row${i}" id="imageUrl${i}"><img src=${imageUrl} height="100" width="100"></img></td>
                <td contenteditable='false' class="row${i}" id="description${i}">${description}</td>
                <td> <button class=${productId} id="${productId}" onclick="addCart(this.id,${price})">ADD TO CART</button></td>
            </tr>`   
        }
        document.getElementById('productTableBody').innerHTML=html;
    },(e)=>{
        console.log(e)
    })
}


function addCart(id){

    // console.log('addkaart',id,localStorage.getItem('jwtToken'))
    
    var productId = id
    // console.log('kuchhhhh bhiiiii',productId,price)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/api/addCart',{productId:productId})
    // console.log('ajjjajjajjajaj=======',response)
    .then((resp)=>{
        // console.log('0000000000000',resp)
        if(resp.data.status){
            alert(resp.data.message);
            window.location="/userProduct"
        }else{
            alert(resp.data.message);
        }
    
    })

}
