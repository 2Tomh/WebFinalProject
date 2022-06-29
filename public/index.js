const isAuthenticated = localStorage.getItem("isAuthenticated")
const Logout = document.getElementById("Logout")

if(!isAuthenticated){
    window.location.href = "/login"
}


function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }

  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }


  // log out
Logout.addEventListener("click", (e) => {
    e.preventDefault();
    if(isAuthenticated){
        localStorage.setItem("isAuthenticated", false)
        window.location.href = "/login"
    }
    
})




