let signOut = async () => {

    const response = await fetch('/pages/lobby', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer your_token',
            'Content-Type': 'application/json'
        }
    });   
    window.location.href = 'login';
}