const Pool = require('pg').Pool; 
const pool = new Pool({
    user: 'chess', 
    host: 'localhost', 
    database: 'chess_api', 
    password: 'online-chess', 
    port: 5432
})



module.exports = {
    getUsers: async (username, password) => {
        console.log(`username: ${username} | password: ${password}`); 
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]); 
        console.log(`result: ${JSON.stringify(result.rowCount)}`); 
        return result.rowCount > 0; 
    }
    
}