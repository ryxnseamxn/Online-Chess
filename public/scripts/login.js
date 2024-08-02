let login = async () => {
    const email = document.querySelector('#username').value; 
    const password = document.querySelector('#password').value; 

    const response = await fetch('/public/pages/login.html', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    console.log(response); 
}