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


//signup logic 
router.post("pages/signup.html", async (req, res) => {
    try {
        const {email, password } = req.body; 
        //check if user exists 
        let user = db.getUsers(email, password); 
        if(user){
            return res.status(500).json({
                message: 'User already exists',
                type: 'warning', 
            }); 
        }
        //if the user doesn't exist, create a new one 
        let result = db.newUser(email, password); 
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

routes.post('pages/login.html', async (req, res) => {
    try { 
        const { email, password } = req.body; 
        const user = db.getUsers(email, password); 

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
router.post("/logout", (_req, res) => {
    // clear cookies
    res.clearCookie("refreshtoken");
    return res.json({
      message: "Logged out successfully! 🤗",
      type: "success",
    });
  });

//Refresh token request 
router.post("/refresh_token", (req, res) => {
    try {
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
        if (!id){
            return res.status(500).json({
              message: "Invalid refresh token! 🤔",
              type: "error",
            });        
        }
        
    }catch (error) { 
        res.status(500).json({
            type: "error", 
            message: "Error refreshing token", 
            error,
        })
    }
})
module.exports = router; 