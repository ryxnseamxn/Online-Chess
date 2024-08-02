const Pool = require('pg').Pool; 
const pool = new Pool({
    user: 'chess', 
    host: 'localhost', 
    database: 'chess-api', 
    password: 'online-chess', 
    port: '5432'
})



module.exports = {
    getUsers: (username, password) => {
        pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (err, result) => {
            if(error){
                throw error; 
            }
            if(result != null){
                return true; 
            }
            return false;
        });
    }
    
}