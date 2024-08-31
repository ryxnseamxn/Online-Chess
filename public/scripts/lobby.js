await fetch('/pages/lobby', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Authorization': `Bearer buttmunch`,
        'Content-Type': 'application/json'
    }
});   