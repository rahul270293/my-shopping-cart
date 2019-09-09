function tata(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cpassword = document.getElementById('cpassword').value;

    axios.post('/api/signup' ,{name:name, email:email, password:password, cpassword:cpassword})
    .then((doc) =>{
        if(doc.data.status){
            alert(doc.data.message);
            window.location='/signin';
        }else{
            res.send(doc.data.status)
        }
    })

}