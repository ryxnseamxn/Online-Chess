const { verify } = require('jsonwebtoken'); 
const db = require('../connection');
const protected = async (req, res, next) => {
    const authorization = req.cookies.accesstoken;
    if(!authorization){
        return res.status(500).json({
            message: "No token! 🤔",
            type: "error",
        });
    }

    const token = authorization; 
    let id;
    try {
        id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
    } catch {
        return res.status(500).json({
          message: "Invalid token! 🤔",
          type: "error",
        });
    }
    if(!id){
        return res.status(500).json({
        message: "Invalid token! 🤔",
        type: "error",
        });
    }
    const user = await db.getById(id); 
    if(!user){
        return res.status(500).json({
            message: "User doesn't exist! 😢",
            type: "error",
        });
    }
    req.user = user; 
    next();
};
module.exports = {protected}; 