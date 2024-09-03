let signOut = async () => {
    const response = await fetch('/pages/signout', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const { message } = await response.json(); 
    if(message === 'success'){
        window.location.href = '/pages/login'; 
    }
}; 

let joinGame = () => {
    window.location.href = '/pages/game'; 
} 