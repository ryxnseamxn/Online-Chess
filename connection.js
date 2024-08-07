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
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [username, password]); 
        return result.rowCount > 0; 
    }   
}