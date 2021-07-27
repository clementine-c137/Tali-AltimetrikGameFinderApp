let password = document.querySelector(".psw");
let eye = document.querySelector(".eye");


const showPassword = function() {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

eye.addEventListener("click", showPassword);

let userName = document.querySelector(".uname");

 const loginVal = function () {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ((userName == "") || (userName.type === "email")) {
        alert("please enter user a valid email");
    } else if ((password == "") || (password.length < 3)) {
        alert ("Please enter a valid password, min 3 characters");
    } else {

    }
 }

 const login = document.querySelector(".login-button")
 login.addEventListener("click", loginVal);