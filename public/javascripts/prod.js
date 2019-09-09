function prods(){
    var title = document.getElementById('title').value;
    var price = document.getElementById('price').value;
    var imageUrl = document.getElementById('imageUrl').value;
    var description = document.getElementById('description').value;


    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/api/add-product',
     {title:title, price:price, imageUrl:imageUrl , description:description})
     .then((saved) => {
         if(saved.data.status){
             alert(saved.data.message);
             window.location ='/admin-product';
         } else{
             alert(saved.data.message);
         }
     })
}


