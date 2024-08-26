const { sign } = require('jsonwebtoken'); 
require('dotenv').config(); 

const createAccessToken = (id) => {
    return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 15 * 60, 
    }); 
}; 

const createRefreshToken = (id) => {
    return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "90d",
    });
}; 

const sendAccessToken = (_req, res, accessToken) => {
    res.json({
        accessToken, 
        message: 'Sign in Successful', 
        type: 'success',
    });
};

const sendRefreshToken = (res, refreshToken) => {
    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
    });
};

module.exports = {
    createAccessToken, 
    createRefreshToken, 
    sendAccessToken, 
    sendRefreshToken,
}; 