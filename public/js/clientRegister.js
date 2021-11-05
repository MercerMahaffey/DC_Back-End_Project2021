let registerForm = document.querySelector('#registerForm');
let password1 = document.querySelector('#password1');
let password2 = document.querySelector('#password2');
let passwordWarning = document.querySelector('#passwordWarning');

registerForm.addEventListener('submit', (e) => {
    
    
    // console.log(e.target.password.value);
    // console.log(e.target.password2.value);

    if(e.target.password.value !== e.target.password2.value){
        e.preventDefault()
        // console.log('passwords dont match');
    }
})

password2.addEventListener('keyup', (e) => {
    // console.log(password1.value);
    // console.log(password2.value);

    if(password1.value != password2.value){
        passwordWarning.className = "fw-700 mb-4 text-danger"
    }
    if(password1.value == password2.value){
        passwordWarning.className = "fw-700 mb-4 text-danger visually-hidden"
    }
})



