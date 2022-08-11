require('dotenv').config()
const {Admin,User,Modules} = require('../models')

module.exports = {

    // Register User
    async updateModules (req, res) {
        try{
            const {id_module,sliders,token} = req.body;
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON()
                if(userJson.role === 'admin'){
                    
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