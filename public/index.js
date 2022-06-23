function loadHome(){
    fetch("http://localhost:3000/HomePage.html")
    .then(function(response){
        return response.text()
    })
    .then(function(html){
        document.getElementById("renderPage").innerHTML=html;
    });
}

function loadLogin(){
    fetch("http://localhost:3000/Login.html")
    .then(function(response){
        return response.text()
    })
    .then(function(html){
        document.getElementById("renderPage").innerHTML=html;
    });
}