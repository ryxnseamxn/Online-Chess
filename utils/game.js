// utils/chessGame.js
const { v4: uuidv4 } = require('uuid');
const { Chess } = require('chess.js'); // Assuming you're using chess.js library

class ChessGame {
    constructor() {
        this.game = new Chess();
        this.gameId = uuidv4();
    }

    isGameOver() {
        return this.game.game_over();
    }

    movePiece(from, to) {
        const move = this.game.move({
            from: from,
            to: to,
            promotion: 'q' // always promote to a queen for simplicity
        });
        return move;  // null if move is invalid
    }

    setWhite(user){
        this.white = user; 
    }

    setBlack(user){
        this.black = user; 
    }

    getGameStatus() {
        let status = '';
        const turn = this.game.turn() === 'w' ? 'White' : 'Black';
        if (this.game.in_checkmate()) {
            status = `Game over, ${turn} is in checkmate.`;
        } else if (this.game.in_draw()) {
            status = 'Game over, drawn position.';
        } else {
            status = `${turn} to move`;
            if (this.game.in_check()) {
                status += `, ${turn} is in check.`;
            }
        }
        return status;
    }

    getFen() {
        return this.game.fen();
    }

    getPgn() {
        return this.game.pgn();
    }
}

module.exports = ChessGame;
