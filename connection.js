//psql -d {database} -U {user}

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
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]); 
        return result.rowCount > 0; 
    },   
    newUser: async (username, password) => {
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]); 
        const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]); 
        return result.rowCount > 0; 
    },
    addToken: async (username, password, refresh_token) => {
        await pool.query('UPDATE users SET refresh_token = $1 WHERE username = $2 AND password = $3', [refresh_token, username, password]); 
    },
    getById: async (id) => {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [id]);
        return JSON.stringify(result.rows); 
    },
    getRefreshToken: async (username) => {
        const result = await pool.query('SELECT refresh_token FROM users WHERE username = $1', [username]); 
        const id = result.fields[-1];
        return id ?? false; 
    }, 
    newUserObject: async (color, game, username) => {
        await pool.query('INSERT INTO userobject (color, currentgame, username) VALUES ($1, $2, $3)', [color, game, username]); 
    },
    getUserObject: async (username) => {
        let result = await pool.query('SELECT * FROM userobject WHERE username = $1', [username]); 
        return result.rowCount > 0;        
    },
    newGame: async (gameid, gamestate) => {
        if(!this.findGame(gameid)){
            await pool.query('INSERT INTO game (id, gamestate) VALUES ($1, $2)', [gameid, gamestate]); 
        }
    }, 
    findGame: async (gameid) => {
        let result = await pool.query('SELECT * FROM game WHERE gameid = $1', [gameid]); 
        return result.rowCount > 0; 
    }, 
    addPlayer: async (gameid, user) => {
        let color = Math.random() >= 0.5 ? 'white' : 'black'; 
        let result = await pool.query(`UPDATE game SET ${color} = $1 WHERE gameid = $2`, [color, user, gameid]); 
        return result.rowCount(); 
    },
    findGameOnePlayer: async () => {
        let result = await pool.query('SELECT * FROM game WHERE (white IS NOT NULL AND black IS NULL) OR (white IS NULL AND black IS NOT NULL)');
        console.log(result.rows); 
        return result.rows[0];
    }
}