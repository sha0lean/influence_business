require('dotenv').config()
const {Entrepreneur,Project,Modules,User} = require('../models')

module.exports = {
    async deleteUser(req,res){
        try{
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON()
                //We're searching if the user is an entrepreneur in order to delete all its projects
                const entrepreneur = await Entrepreneur.findOne({
                    where: {
                        id_user: userJson.id_user
                    }
                })
                if(entrepreneur){
                    const entrepreneurJson = entrepreneur.toJSON()
                    await Project.findAll({
                        raw: true,
                        where: {
                            id_entrepreneur: entrepreneurJson.id_entrepreneur
                        }
                    }).then((projects) => {
                        for(let i = 0;i<projects.length;i+=1){
                            Project.destroy({
                                where: {
                                    id_project: projects[i].id_project
                                }
                            })
                        }
                    })
                }
                await User.destroy({
                    where: {
                        id_user: userJson.id_user
                    }
                }).then(() => {
                    res.status(200).send({
                        message: "The user has been deleted"
                    })
                })
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