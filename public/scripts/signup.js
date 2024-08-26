let signup = async () => {
    const emailField = document.querySelector('#username').value; 
    const passwordField = document.querySelector('#password').value; 
    if(emailField.length <= 4 || passwordField.length <=4 ){
        alert('Username and password must be greater than 4 characters'); 
        return; 
    }
    const response = await fetch('signup.html', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailField, password: passwordField })
    });

    const success = await response.json(); 
    console.log(`Success: ${success}`);     
    if(success){
        alert('Signup Successful!')
        window.location.href = '/pages/login.html'; 
        console.log(`success: ${success}`); 
    }
    alert('Email Already Exists!'); 
}