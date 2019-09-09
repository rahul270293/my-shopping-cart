function fetchCart(){

    var jen='',title="",price="",imageUrl="",description="",html='';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/cart')
    .then((detail)=>{
    
        // console.log('=======hdhhdhdh===',detail.data.data)
         jen = detail.data.data.length
         var totalprice = null
        // console.log('hhhdhhdhhhd',jen)
        for(i=0;i<jen;i++){
            title = detail.data.data[i].title;
            price = detail.data.data[i].price;
            imageUrl = detail.data.data[i].imageUrl;
            // description= detail.data.data[i].description;
            productId=detail.data.data[i]._id
            totalprice = totalprice + price
            // console.log('kkkdkkdkdkk===',productId)


            html+= `<tr>
                <td  contenteditable='false' class="row${i}" id="title${i}">${title}</td>
                <td contenteditable='false' class="row${i}" id="price${i}">${price}</td>
                <td class="row${i}" id="imageUrl${i}"><img src=${imageUrl} height="100" width="100"></img></td>
                <td contenteditable='false' class="row${i}" id="description${i}">${description}</td>
                <td>
                <td> <button  id="${productId}" onclick="deleteItem(this.id, ${i})">DELETE</button></td>
            </tr>`

        }
        // console.log('jdjjdjdjjdjdjjdjdjdj',totalprice)
        
        document.getElementById('productTableBody').innerHTML=html;
        document.getElementById('totalprice').innerHTML=totalprice;
        
    })
}


function deleteItem(id,jk){
    // console.log('======ajkakajajja======',id)
    var productId=id;

    axios.post('/api/editCart', {productId:productId})
    .then((resp)=>{
        if(resp.data.status){
            alert(resp.data.message)
            window.location="/cart"
        }
    })

}


