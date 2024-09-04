class User {
    constructor(userId, username) {
        this.userId = userId;      
        this.username = username;  
        this.color = null;         
        this.currentGame = null;   
    }

    assignColor(color) {
        this.color = color;
    }

    joinGame(game) {
        this.currentGame = game;
    }

    leaveGame() {
        this.currentGame = null;
        this.color = null;
    }
}
