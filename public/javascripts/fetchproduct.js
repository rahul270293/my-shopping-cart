
function fetchProds(){

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
            // console.log('jdhdhfhhfjkks',productId)
            // console.log('kkdkkdkd=====dkdkdkk',title,price,imageUrl,description,html)

            html+= `<tr>
                <td  contenteditable='false' class="row${i}" id="title${i}">${title}</td>
                <td contenteditable='false' class="row${i}" id="price${i}">${price}</td>
                <td class="row${i}" id="imageUrl${i}"><img src=${imageUrl} height="100" width="100"></img></td>
                <td contenteditable='false' class="row${i}" id="description${i}">${description}</td>
                <td> <button class=${productId} id="${productId}" onclick="editRow(this.id,${i})">EDIT</button></td>
                <td> <button class=${productId} id="${productId}" onclick="deleteRow(this.id, ${i})">DELETE</button></td>
                
            </tr>`   
        }

        document.getElementById('productTableBody').innerHTML=html;
    },(e)=>{
        console.log(e)
    })
}

function editRow(id,ad){
    // console.log("=======12334555555=====",id,ad)
    var j = ad
    var productId = id

    document.getElementsByClassName(`row${j}`)[0].setAttribute("contenteditable",'true')
    // console.log('challlllllllllla===akkka',document.getElementsByClassName(`row${j}`)[0])
    document.getElementsByClassName(`row${j}`)[1].setAttribute('contenteditable','true')
    // console.log('=======kabhi kabhi===',document.getElementsByClassName(`row${j}`)[1])
    document.getElementsByClassName(`row${j}`)[3].setAttribute('contenteditable','true')
    
    document.getElementById(`title${j}`).innerHTML;
    // console.log('chamacham=====',document.getElementById(`title${j}`).innerHTML)
    document.getElementById(`price${j}`).innerHTML;
    // console.log('==thik hai ==',document.getElementById(`price${j}`).innerHTML)
    document.getElementById(`description${j}`).innerHTML
    // console.log('chalte rahe',document.getElementById(`description${j}`).innerHTML)

    document.getElementById(id).innerText= 'Update';
    document.getElementById(id).removeAttribute('onclick');
    document.getElementById(id).setAttribute('onclick',`updateRow(this.id,${j})`);
    // console.log('=====aa chhhahh====','Update');
}

function updateRow(id,jf){
    // console.log("=======",id,jf)
    var k = jf
    // console.log('chammmmmmamamm',k)

    var title =document.getElementById(`title${k}`).innerHTML
    var price = document.getElementById(`price${k}`).innerHTML
    var description= document.getElementById(`description${k}`).innerHTML
    var productId = id;
    // console.log('terararrrrarrrarar',title,price,description)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/api/edit-products',{ productId:productId,updatedTitle:title, updatedPrice:price, updatedDescription:description})
    .then((saved)=>{
        if(saved.data.status){
            alert(saved.data.message)
            window.location="/admin-product"
        }else{
            alert(saved.data.message)
        }
    })
}


function deleteRow(id){
    // console.log('skkskskskksksksksksks',id)
    var productId= id;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/api/delete-products',{productId:productId})
    .then((del)=>{
        if(del.data.status){
            alert(del.data.message)
            window.location='admin-product';
        }else{
            alert(del.data.message)
        }
    })
};
