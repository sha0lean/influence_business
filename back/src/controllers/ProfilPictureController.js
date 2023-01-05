
require('dotenv').config()
const {User} = require('../models')

module.exports = {
    async getProfilPicture(req,res){
        const token = global.token;
        try{
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                res.status(200).send({
                    message: "",
                    profilPicture: userJson.profilPicture
                })
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue."
            })
        }
    }
}