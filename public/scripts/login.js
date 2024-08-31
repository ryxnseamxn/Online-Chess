let login = async () => {
    const emailField = document.querySelector('#username').value; 
    const passwordField = document.querySelector('#password').value; 
    if(emailField.length <= 4 || passwordField.length <=4 ){
        alert('Username and password must be greater than 4 characters'); 
        return; 
    }
    const response = await fetch('/pages/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailField, password: passwordField })
    });

    const { accessToken, message, type } = await response.json(); 
    console.log('Type: ' + type);   
    if(type === 'success'){
        // await fetch('/pages/lobby', {
        //     method: 'GET',
        //     credentials: 'include',
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`,
        //         'Content-Type': 'application/json'
        //     }
        // });   
        window.location.href = '/pages/lobby'; 
    }else{
        alert('Login Failed'); 
    }
}