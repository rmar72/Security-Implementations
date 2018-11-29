
// ----------------------------------------------------------------------- XMLHttpRequest
// make the request to the login endpoint
// function getToken() {
//     var loginUrl = "http://localhost:2018/login"
//     var xhr = new XMLHttpRequest();
//     var userElement = document.getElementById('username');
//     var passwordElement = document.getElementById('password');
//     var tokenElement = document.getElementById('token-holder');
//     var user = userElement.value;
//     var password = passwordElement.value;

//     xhr.open('POST', loginUrl, true);
//     xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//     xhr.addEventListener('load', function() {
//         var responseObject = JSON.parse(this.response);
//         console.log(responseObject);
//         if (responseObject.token) {
//             tokenElement.innerHTML = responseObject.token;
//         } else {
//             tokenElement.innerHTML = "No token received";
//         }
//     });

//     var sendObject = JSON.stringify({name: user, password: password});
//     console.log('going to send', sendObject);
//     xhr.send(sendObject);
// }

//make the request to the secret API endpoint
// function getSecret() {
//     var url = "http://localhost:2018/secret"
//     var xhr = new XMLHttpRequest();
//     var tokenElement = document.getElementById('token-holder');
//     var resultElement = document.getElementById('result');
//     xhr.open('GET', url, true);
//     xhr.setRequestHeader("Authorization", "bearer " + tokenElement.innerHTML);
//     xhr.addEventListener('load', function() {
//         var responseObject = JSON.parse(this.response);
//         console.log(responseObject);
//         resultElement.innerHTML = this.responseText;
//     });

//     xhr.send(null);
// }

// ---------------------------------------------------------------------------------- es6 fetch 
function getToken(){
    var url = "http://localhost:2018/login";
    var userElement = document.getElementById('username');
    var passwordElement = document.getElementById('password');
    var tokenElement = document.getElementById('token-holder');
    var user = userElement.value;
    var password = passwordElement.value;
    var data = {name: user, password: password};

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }).then(res => res.json())
    .then(response =>  {
        tokenElement.innerHTML = response.token;
        console.log('Success:', JSON.stringify(response) );      
    })
    .catch(error => console.error('Error:', error));
}
    
function getSecret(){
    var url = "http://localhost:2018/secret";
    var tokenElement = document.getElementById('token-holder');

    fetch(url, {
        method: 'GET',
        headers:{
            'Authorization': `bearer ${tokenElement.innerHTML}`
        }
    }).then(res => res.json())
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error)); 
}

///////// uploading file
function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}