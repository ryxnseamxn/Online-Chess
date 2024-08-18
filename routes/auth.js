const express = require('express'); 
const router = express.Router(); 
const db = require('../connection'); 

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

routes.post('pages/login.html', async (req, res) => {
    try { 
    } catch (error) {
        res.status(500).json({
            type: 'error', 
            message: 'Login failed', 
            error, 
        })
    }
});

module.exports = router; 