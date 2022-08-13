require('dotenv').config()
const { User,Expert,Entrepreneur,Messages } = require('../models')
module.exports ={
    async contact(req,res){
        try{
            const {id_project,id_entrepreneur,id_expert,message} = req.body;
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                const expert = await Expert.findOne({
                    where:{
                        id_user: userJson.id_user
                    }
                })
                if(expert){
                    //We verify if the entrepreneur exist
                    const entrepreneur = await Entrepreneur.findOne({
                        where: {
                            id_entrepreneur: id_entrepreneur
                        }
                    })
                    if(entrepreneur){
                        await Messages.create({
                            id_entrepreneur: id_entrepreneur,
                            id_expert: id_expert,
                            message: message,
                            id_project: id_project
                        }).then(() => {
                            res.status(200).send({
                                message: "Your message has been sent"
                            })
                        })
                    }
                    else{
                        res.status(404).send({
                            message: "User not found"
                        })
                    }
                }
                else{
                    res.status(404).send({
                        message: "User not found"
                    })
                }
            }
            else{
                res.status(404).send({
                    message: "User not found"
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