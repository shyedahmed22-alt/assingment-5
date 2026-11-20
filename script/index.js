document.getElementById("signInBtn").addEventListener("click", function(){
    const Username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if( Username ===  "admin" && password === "admin123"){
        alert("You've loged In successfully")
        window.location.href ="main.html"
    }
    else{
        alert("Something went wrong. Please try again")
    }
})