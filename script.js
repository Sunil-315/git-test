document.addEventListener('DOMContentLoaded', ()=>{
    console.log("Script loaded and DOM is ready!");
    const form = document.getElementById('signupForm');
    const captchaTextElement = document.getElementById('captchaText');
    const refreshcaptchaBtn = document.getElementById('refreshCaptcha');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progressbar');
    const successMessage = document.getElementById('successMessage');

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('LastName');
    const emailInput = document.getElementById('email');
    const confirmemailInput = document.getElementById('confirmemail');
    const passwordInput = document.getElementById('password');
    const confirmpasswordInput = document.getElementById('confirmpassword');
    const captchaInput = document.getElementById('captchaInput');

    let currentCaptcha = '';

    function generateCaptcha(){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let captcha = '';
        for (let i=0; i<6 ; i++){
            captcha+=chars.charAt(Math.floor(Math.random()*chars.length));
        }
        return captcha;
    }

    function refreshCaptcha(){
        currentCaptcha = generateCaptcha();
        captchaTextElement.textContent = currentCaptcha;
    }

    function showError(fieldId, message){
        document.getElementById(fieldId + 'Error').textContent  = message;
    }

    function clearErrors(){
        const errorElements = document.querySelectorAll('.error-message')
        errorElements.forEach(el=>el.textContent = '');
    }

    function validateForm()
    {
        clearErrors();
        let isValid = true;
        if(firstNameInput.value.trim()==''){
            showError('firstName', 'First name is requried.');
            isValid=false;
        }
        
        if(lastNameInput.value.trim()==''){
            showError('LastName','Last name is required.');
            isValid = false;
        }

        if(emailInput.value.trim()!=confirmemailInput.value.trim(){
            showError('confirmemail', 'Emails do not match.');
            isValid= false;
        })
        const password=passwordInput.value;
        if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)){
            showError('password','Password must contain letters and digits.');
            isValid = false;
        }

        if(password!=confirmpasswordInput.value){
            showError('confirmpassword','Password do not match.');
            isValid=false;
        }
        if(captchaInput.value.trim()!=currentCaptcha){
            showError('captchaInput','captcha do not match.');
            isValid = false;
        }
        return isValid;
    }


    function startProgressBar(){
        progressContainer.style.display = 'block';
        let width = 0;
        const interval = setInterval(()=>{
            if(width >= 100){
                clearInterval(interval);
                successMessage.textContent = "Sign-up successful!";
            }
            else{
                width++;
                progressBar.style.width = width + '%';
            }
        },20);
    }

    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        if(validateForm()){
            console.log('Form is valid! Submitting...');
            Array.from(form.elements).forEach(element=>element.disabled = true);
            startProgressBar();
        }
        else
        {
            console.log('Form is invalid. Please correct the errors.');
        }
    });

    refreshcaptchaBtn.addEventListener('click',refreshCaptcha);
    refreshCaptcha();


})