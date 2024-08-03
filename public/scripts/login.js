let login = async () => {
    const emailField = document.querySelector('#username').value; 
    const passwordField = document.querySelector('#password').value; 

    const response = await fetch('/pages/login.html', {
        method: 'POST', 
        body: JSON.stringify({ email: emailField, password: passwordField })
    });

    console.log(response); 
}