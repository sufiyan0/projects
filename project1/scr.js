// Import Dom elements form html 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2')


// This function is called when requirements are not fully fulled
function showError(input, massage){
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = massage; 
};


// this function is called when all the requirements are cinfirm.
function showSuccess(input){
    // Getting parent element of input and add the success class
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

function checkRequired(inputArray){
    inputArray.forEach(input => {
        if(input.value === ''){
            console.log(input.id);
        showError(input, `${input.id} is required`)
    }else{
        showSuccess(input)
    } 

    });
}  

function checkLength(input, min, max ){
    if(input.value.length < min){
        showError(input, `${input.id} is need to be ${min} charactor `);
    }else if(input.value.length > max ){
        showError(input, `${input.id} is not grater then ${max} charactor`);
    }
    else{
        showSuccess(input)
    }
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( re.test(input.value.trim()) ){
        showSuccess(input);
    }else{
        showError(input, 'This is not a valid email');
    }
}



function checkpasswordsMatch(input1, input2){
    if(input1.value  !==  input2.value){
        showError(input2 , `Passwords don't match` );
    }
};


form.addEventListener('submit', e => {
    e.preventDefault();

    checkRequired([username,email,password,password2])
    checkLength(username,3,12)
    checkLength(password,5,30)
    checkEmail(email);
    checkpasswordsMatch(password ,password2)
});