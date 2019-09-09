function suno() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    axios.post('/api/signin', { email: email, password: password })
        .then((response) => {
            // console.log('===============ajajabsdk====',response);
            if (response.data.status) {
                localStorage.setItem("jwtToken", response.data.token);
                if (response.data.message == 'admin login successful') {
                    alert(response.data.message)
                    window.location = '/admin-product';
                } else {
                    alert(response.data.message)
                    window.location = '/userProduct';
                } 

            } else {
                alert(response.data.message)
                console.log(response)
                window.location='/signup'
            }
        })

}


function logout() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('/api/signout')
        .then((resp) => {
            // console.log('========nya hai=====',resp.data.message)
            localStorage.clear('jwtToken');
            location.replace('/');
            if (resp.data.status) {
                alert(resp.data.message)
                window.location = '/'
            }
            // if(resp.data.status){
            //     axios.defaults.headers.common['Authorization']='';
            //     if(typeof(Storage)!=='undefined'){
            //         localStorage.setItem('jwtToken','');
            //     }
            //     location.replace('/');

            
            
        })
}