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

//get request for protected route 
router.get('/protected', protected, async (req, res) => {
    try {
        if (req.user)
            return res.json({
            message: "You are logged in! 🤗",
            type: "success",
            user: req.user,
            });
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
})

//signup logic 
router.post("/pages/signup", async (req, res) => {   
    console.log(`Auth.js endpoint`); 
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

router.post('/pages/login.html', async (req, res) => {
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
        const user = db.getById(id); 
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