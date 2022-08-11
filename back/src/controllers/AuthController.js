require('dotenv').config()
const { User,Investor,Expert,Entrepreneur } = require('../models')
const jwt = require('jsonwebtoken');
const crypto = require("crypto")

// -- Functions -- //
// jwt token

function jwtSignUser(user) {
    const secretKey = process.env.JWT_SECRET
    //We generate the secretKey
    const token = jwt.sign({
        username: user.email,
        firstname: user.first_name,
        lastname: user.last_name,
        role: user.role
    },
    secretKey,{
        expiresIn: "24h"
    })
    if(token){
        // We create the hash sha256 using the TOKEN_KEY
        const sha256Hasher = crypto.createHmac("sha256",process.env.JWT_SECRET);
        if(sha256Hasher){
            //We hash our token
            const tokenHashed = sha256Hasher.update(token).digest("hex");
            user = User.update({
                token: tokenHashed
            }, {
                where: {
                    email: user.email,
                }
            })
            if(user){
                return token
            }
        }
    }
}

module.exports = {

    // Register User
    async register (req, res) {
        try{
            const {email,password,first_name,last_name,role} = req.body;            
            let isUserAlreadyExist = true
            const fetchUser = await User.findOne({
                where: {
                    email: email,
                }
            })
            if(!fetchUser){
                isUserAlreadyExist = false;
            }            
            if(isUserAlreadyExist == false){
                //Prevent the user from registering himself as admin
                role_verify = role
                if(role_verify === 'admin' || role_verify != 'expert' || role_verify != 'investor'){
                    role_verify = 'entrepreneur'
                }
                const newUser = await User.create({
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    role: role_verify        
                })
                const userJson = newUser.toJSON();
                const token = jwtSignUser(userJson);
                //We fill the tables specific to the role
                switch(role){
                    case 'investor':
                        await Investor.create({
                            id_user: userJson.id_user
                        })
                    case 'expert':
                        await Expert.create({
                            id_user: userJson.id_user
                        })
                    default:
                        await Entrepreneur.create({
                            id_user: userJson.id_user
                        })
                }   
                global.token = token;
                res.status(200).json({
                    token : token,
                    message: 'Register successful'
                });
            }
            else{
                res.status(500).send({
                    message: "Invalid Information"
                })
            }
        }
        catch(err){
            res.status(400).send({
                message: "error : " + err
            })
        }
    }, 

    // Login User
    async login (req, res) {
       try{
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email: email,
                }
            }) 
            if (!user) {
                res.status(401).send({
                    message: 'Invalid information'
                });
            }
            else{
                await user.comparePassword(password).then(isMatch => {
                    if (!isMatch) {
                        res.status(401).send({
                            message: 'Invalid information'
                        });
                    }
                    else{
                        const userJson = user.toJSON();
                        const token = jwtSignUser(userJson);
                        global.token = token;
                        res.status(200).send({
                            token: token,
                            message: "Your credentials are correct"
                        });
                        
                    }
                })   
            }
        }catch(err){
            res.status(500).send({
                message: 'Internal error'
            });
        };
        
    },
    async logout (req,res){
        try{
            const token = global.token;
            const user = await User.findOne({
                where:{
                    token: token
                }
            })
            if(user){
                const userJson = user.toJSON(); 
                await User.update({
                    token: jwtSignUser(userJson)
                },
                {
                    where: {
                        id_user: userJson.id_user
                    }   
                }).then(() => {
                    res.status(200).send({
                        message: "The user has been disconnected"
                    })
                })
            }
            else{
                res.status(404).send({
                    message: "The user has not been found"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Internal error"
            })
        }
    }
}
