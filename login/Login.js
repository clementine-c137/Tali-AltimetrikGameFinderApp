let userName = document.querySelector(".uname");
let password = document.querySelector(".password-input");
let eye = document.querySelector(".eye");
let loginButton = document.querySelector(".login-button");
let emailError = document.querySelector('.error-message-email');
let passwordError = document.querySelector('.error-message-psw');


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

 //check email input//
function emailVal(userName) {
    let filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = filter.test(userName.value) && (userName.value.length < 255);

    if (!result) {
        emailError.textContent += "Enter a valid email";
        console.log(emailError)
        new ErrorColor(1, 'user-container', 'icon-color', userName, 'error-input', 'error-icon');
       //document.querySelector('.user-container').insertAdjacentHTML('afterend', 'enter a valid');
      
        /*document.getElementsByClassName('user-container')[0].classList.add('error-input');
        document.getElementsByClassName('icon-color')[0].classList.add('error-icon');
        document.getElementsByClassName('icon-color')[1].classList.add('error-icon');
        userName.style.color = '#E07979';*/
    } else {
        emailError.innerHTML = ""
        document.getElementsByClassName('user-container')[0].classList.remove('error-input');
        document.getElementsByClassName('icon-color')[0].classList.remove('error-icon');
        document.getElementsByClassName('icon-color')[1].classList.remove('error-icon');
    }
    return true;
}

function passwordVal(password) {
    if (password.value.length < 3) {
        passwordError.textContent += "Enter a valid password";
        document.getElementsByClassName('password-container')[0].classList.add('error-input');
        document.getElementsByClassName('icon-color')[2].classList.add('error-icon');   
        
    } else {
        password.innerHTML = ""
        document.getElementsByClassName('password-container')[0].classList.remove('error-input');
        document.getElementsByClassName('icon-color')[2].classList.remove('error-icon');
    }
    return true;
}

loginButton.addEventListener("click", () => {
    emailVal(userName);
    passwordVal(password); 
});



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
    document.getElementsByClassName('icon-color')[2].classList.add('activated');
});
password.addEventListener('blur', () => {
    document.getElementsByClassName('password-container')[0].classList.remove('input-focus');
    document.getElementsByClassName('icon-color')[2].classList.remove('activated');   
});


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
        window.location = 'main.html';
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

function loginVal () {
    if (emailVal(userName) && passwordVal(password)) {
        loginButton.addEventListener('click', loginRequest);
    } 
}


let ErrorColor = class {
    constructor(n, element1, element2, element3, style1, style2) {
        this.n = n;
        this.element1 = element1;
        this.element2 = element2;
        this.element3 = element3;
        this.style1 = style1;
        this.style2 = style2;

        document.getElementsByClassName(element1)[0].classList.add(style1);

            for (let i = 0; i <= n; i++) {
                document.getElementsByClassName(element2)[i].classList.add(style2);
            }
        
        element3.style.color = '#E07979';
    }
}
