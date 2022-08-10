require("dotenv").config()
const jwt = require("jsonwebtoken");
const {User} = require("../models");



async function verifyToken(req,res,next){
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message: "A token is required"
        });
    } 
    try{
        const user = await User.findOne({
            where: {
                token: token
            }
        }).then((user) => {
            if(user){
                const userJson = user.toJSON()
                req.user = userJson
                return next();
            }
            else{
                return res.status(401).send({
                    message: "Invalid token"
                })
            }
        })
        
        // const decoded = jwt.verify(token,process.env.TOKEN_KEY);
        // req.user = decoded;
        
    }
    catch(err){
        return res.status(401).send({
            message: "Invalid token"
        })
    }
    
}

module.exports = verifyToken;