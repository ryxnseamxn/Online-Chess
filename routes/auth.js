const Path = require('path'); 
const express = require('express'); 
const router = express.Router(); 
const db = require('../connection'); 
const {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
  } = require("../utils/token");
const { verify } = require('jsonwebtoken'); 
const { protected } = require('../utils/protected');
const User = require('../utils/user'); 
const Game = require('../utils/game'); 

//get request for protected route 
router.get('/pages/lobby', protected, async (req, res) => {
    try {
        if (req.user){
            return res.sendFile(Path.join(__dirname, '../public/pages/lobby.html')); 
        }
        return res.status(500).json({
            message: "You are not logged in! 😢",
            type: "error",
        });
    } catch (error) {
        return res.status(500).json({
            type: 'error', 
            message: 'An error has occured', 
            error, 
        })
    }
});

router.get('/pages/game', protected, async (req, res) => {
    try {
        if (req.user){
            let userObj = JSON.parse(req.user);
            let userId = userObj[0].id;
            let username = userObj[0].username;
            let user = new User(userId, username);
            let game = new Game(); 
            user.color = 'black'; 
            user.currentGame = game; 
            await db.findGameOnePlayer()
            if(!await db.findGameOnePlayer()){
                await db.newGame(game.gameId, game); 
            }else{

            }
            try {
                if(!await db.getUserObject(username)){
                    await db.newUserObject(user.color, user.currentGame.gameId, username); 
                }
            }catch(error){
                return res.status(500).json({
                    type: 'error', 
                    message: 'An error has occured when creating the game/user', 
                    error, 
                })
            }
            return res.sendFile(Path.join(__dirname, '../public/pages/game.html')); 
        }
        return res.status(500).json({
            message: "You are not logged in! 😢",
            type: "error",
        });
    } catch (error) {
        return res.status(500).json({
            type: 'error', 
            message: 'An error has occured', 
            error, 
        })
    }
});

//signup logic 
router.post("/pages/signup", async (req, res) => {   
    try {
        const {email, password } = req.body; 
        //check if user exists 
        let user = await db.getUsers(email, password);         
        if(user){
            return res.status(500).json({
                message: 'User already exists',
                type: 'warning', 
            }); 
        }
        //if the user doesn't exist, create a new one 
        let result = await db.newUser(email, password); 
        res.status(200).json({
            message: 'User created', 
            type: 'success',
        });
    }catch (error) {
        res.status(500).json({
            type: 'error',
            message: 'An error has occured', 
            error, 
        });
    }
}); 

//login logic 

router.post('/pages/login', async (req, res) => {
    try { 
        const { email, password } = req.body; 
        const user = await db.getUsers(email, password);
        if(!user){
            return res.json({
                message: 'User does not exist', 
                type: 'Error', 
            })
        }

        const accessToken = createAccessToken(email); 
        const refreshToken = createRefreshToken(email); 
        db.addToken(email, password, refreshToken); 
        sendRefreshToken(res, refreshToken);
        sendAccessToken(req, res, accessToken);
    } catch (error) {
        res.status(500).json({
            type: 'error', 
            message: 'Login failed', 
            error, 
        })
    }
});

//sign out logic 
router.post("/pages/signout", (_req, res) => {
    // clear cookies
    res.clearCookie("refreshtoken");
    res.clearCookie("accesstoken"); 
    return res.json({ message: 'success' });
});

//Refresh token request 
router.post("/refresh_token", async (req, res) => {
    try {
        const { email, password } = req.body; 
        const { refreshtoken } = req.cookies; 
        if(!refreshtoken){
            return res.status(500).json({
                message: 'No refresh token', 
                error, 
            });
        }
        let id; 
        try{
            id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id; 
        } catch (error) {
            return res.status(500).json({
                message: 'Invalid refresh tokne', 
                error, 
            }); 
        }
        const user = await db.getById(id); 
        if (!user){
            return res.status(500).json({
              message: "User doesn't exist! 😢",
              type: "error",
            });
        }

        if(user !== refreshtoken){
            return res.status(500).json({
                message: "Invalid refresh token! 🤔",
                type: "error",
            });
        }

        const accessToken = createAccessToken(user); 
        const refreshToken = createRefreshToken(user); 

        db.addToken(email, password, accessToken);
        sendRefreshToken(res, refreshToken); 
        return res.json({
            message: "Refreshed successfully! 🤗",
            type: "success",
            accessToken,
        });
        

    }catch (error) { 
        res.status(500).json({
            type: "error", 
            message: "Error refreshing token", 
            error,
        })
    }
})
module.exports = router; 