let signup = async () => {
    const emailField = document.querySelector('#username').value; 
    const passwordField = document.querySelector('#password').value; 

    const response = await fetch('/pages/signup.html', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailField, password: passwordField })
    });

    const { success, message } = await response.json(); 
    if(success){
        window.location.href = '/pages/login.html'; 
        alert('Signup Successful!')
    }
    alert('Email Already Exists!'); 
}