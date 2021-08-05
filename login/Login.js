let userName = document.querySelector(".uname");
let password = document.querySelector(".password-input");
let eye = document.querySelector(".eye");
let loginButton = document.querySelector(".login-button");



const showPassword = function() {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
eye.addEventListener("click", showPassword);

const element = document.querySelector('.login');
element.addEventListener('submit', event => {
  event.preventDefault();
});


 const loginVal = function () {
    let filter =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (userName == "") //|| (userName.type === "email"))// 
    {
        alert("please enter user a valid email");
    } else if ((password == "") || (password.length < 3)) {
        alert ("Please enter a valid password, min 3 characters");
    } else {

    }
 }

 
 loginButton.addEventListener("click", loginVal);

// focus + active for email input //
 userName.addEventListener('keydown', () => {
    document.getElementsByClassName('icon-color')[0].classList.add('activated');
    document.getElementsByClassName('icon-color')[1].classList.add('activated');
});
userName.addEventListener('mousedown', () => {
    document.getElementsByClassName('icon-color')[0].classList.add('activated');
    document.getElementsByClassName('icon-color')[1].classList.add('activated');
});


userName.addEventListener('focus', () => {
    document.getElementsByClassName('user-container')[0].classList.add('input-focus');
});
userName.addEventListener('blur', () => {
    document.getElementsByClassName('user-container')[0].classList.remove('input-focus');
    document.getElementsByClassName('icon-color')[0].classList.remove('activated');
    document.getElementsByClassName('icon-color')[1].classList.remove('activated');
});



//focus + active for password input//
 password.addEventListener('keydown', () => {
    document.getElementsByClassName('icon-color')[2].classList.add('activated');
});
password.addEventListener('mousedown', () => {
    document.getElementsByClassName('icon-color')[2].classList.add('activated');
});


password.addEventListener('focus', () => {
    document.getElementsByClassName('password-container')[0].classList.add('input-focus');
});
password.addEventListener('blur', () => {
    document.getElementsByClassName('password-container')[0].classList.remove('input-focus');
    document.getElementsByClassName('icon-color')[2].classList.remove('activated');   
});




//const targetPassword = document.querySelector('input[type="password"]');//

/*password.addEventListener("focus", () => {
    document.getElementsByClassName('icon-color')[2].classList.add("focused");
});
password.addEventListener("active", () => {
    document.getElementsByClassName('icon-color')[2].classList.add("focused");
});

password.addEventListener("focus", () => {
    document.getElementsByName('password-input')[0].classList.add("input-active");
})*/

const loginRequest = async function() {
    
    const response = await fetch('http://localhost:3000/login/Login', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: userName.value,
        password: password.value}),
    })
    const responseJson = await  response.json();
    if (response.status === 200) {
        document.cookie = 'authToken' + responseJson.accessToken;
        alert ('YAS');
    } else if (response.status === 400) {
        
        console.log(response);
    } 
    /*.then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    }); */

};

loginButton.addEventListener('click', loginRequest);
