const userPassword = document.getElementById("password")
const username = document.getElementById("email")
const form = document.getElementById("form")
const formMessage = document.getElementById("form-message")



form.addEventListener("submit", (e) => {
    e.preventDefault();
    let userEmail = username.value
    let userPass = userPassword.value

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userEmail, userPass })
    })
    .then(response => response.json())
    .then((data) => {
        if(!data){
            formMessage.style.display = "block"
        }
        else{
            localStorage.setItem("isAuthenticated", true)
            window.location.href = "/"
        }
    })
})

