function fetchCart(){

    var jen='',title="",price="",imageUrl="",description="",html='';
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
            </tr>`

        }
        document.getElementById('productTableBody').innerHTML=html;
        
    })
}
