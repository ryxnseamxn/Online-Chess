const User = require('../utils/user'); 
const Game = require('../utils/game');
const { v4: uuidv4 } = require('uuid');
const db = require('../connection'); 

const createGame = async (user) => {
    const gameid = uuidv4();
    let game = new Game();
    await db.newGame(gameid, game); 
    return game; 
}

module.exports = createGame; 