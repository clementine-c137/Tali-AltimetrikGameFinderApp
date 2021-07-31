let userName = document.querySelector(".uname");
let password = document.querySelector(".password-input");
let eye = document.querySelector(".eye");




const showPassword = function() {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
const element = document.querySelector('.login');
element.addEventListener('submit', event => {
  event.preventDefault();
});

eye.addEventListener("click", showPassword);



 const loginVal = function () {
    let filter =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ((userName == "") || (userName.type === "email")) {
        alert("please enter user a valid email");
    } else if ((password == "") || (password.length < 3)) {
        alert ("Please enter a valid password, min 3 characters");
    } else {

    }
 }

 const login = document.querySelector(".login-button")
 login.addEventListener("click", loginVal);
 
//const targetPassword = document.querySelector('input[type="password"]');//

/*password.addEventListener("focus", () => {
    document.getElementsByClassName('icon-color')[2].classList.add("focused");
});
password.addEventListener("active", () => {
    document.getElementsByClassName('icon-color')[2].classList.add("focused");
});*/



