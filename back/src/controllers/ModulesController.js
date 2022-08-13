require('dotenv').config()
const {Admin,User,Modules} = require('../models')

module.exports = {

    // Register User
    async updateModule (req, res) {
        try{
            const {id_module,slider1,slider2,slider3,slider4,slider5,token} = req.body;
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON()
                if('admin'.localeCompare(userJson.role) === 0){
                    const modules = await Modules.findOne({
                        where: {
                            id_modules: id_module
                        }
                    })
                    if(modules){
                        await Modules.update({
                                slider1: slider1,
                                slider2: slider2,
                                slider3: slider3,
                                slider4: slider4,
                                slider5: slider5
                        },
                        {
                            where:{
                                id_modules: id_module
                            }
                        }).then(() => {
                            res.status(200).send({
                                message: "The module has been updated"
                            })
                        })
                    }
                    else{
                        res.status(404).send({
                            message: "Module not found"
                        })
                    }
                }
                else{
                    res.status(401).send({
                        message: "You're not authorized to update modules"
                    })
                }
            }
        }
        catch(err){
            res.status(500).send({
                message: "error : " + err
            })
        }
    }
}