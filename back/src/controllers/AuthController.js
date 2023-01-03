require('dotenv').config()
const { User,Investor,Expert,Entrepreneur,Role } = require('../models')
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

            //Problème

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
                if('expert'.localeCompare(role_verify) === 0){
                    role_verify = 'expert'
                }
                else if('investor'.localeCompare(role_verify) === 0){
                    role_verify = 'investor'
                }
                else{
                    role_verify = 'entrepreneur'
                }                
                
                console.log("email : ",email)
                console.log("password : ",password)
                console.log("first_name : ",first_name)
                console.log("last_name : ",last_name)


                const newUser = await User.create({
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    work_status: false
                })
               
                
                const userJson = newUser.toJSON();
                const token = jwtSignUser(userJson);
                //We fill the tables specific to the role
                if(role.localeCompare("investor") === 0){
                    const investor = await Investor.create({
                        id_user: userJson.id_user
                    })
                    if(investor){
                        await Role.create({
                            id_user: userJson.id_user,
                            role_name: "investor"
                        })
                    }

                }
                else if(role.localeCompare("expert") === 0){
                    const expert = await Expert.create({
                        id_user: userJson.id_user
                    })
                    if(expert){
                        await Role.create({
                            id_user: userJson.id_user,
                            role_name: "expert"
                        })
                    }
                }
                else{
                    const entrepreneur = await Entrepreneur.create({
                        id_user: userJson.id_user
                    })
                    if(entrepreneur){
                        await Role.create({
                            id_user: userJson.id_user,
                            role_name: "entrepreneur"
                        })
                    }
                }
                global.token = token;
                res.status(200).json({
                    token : token,
                    role: userJson.role,
                    message: 'Register successful'
                });
            }
            else{
                res.status(500).send({
                    message: "Email déjà utilisé"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Internal error : " + err
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
                            role: userJson.role,
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
