require('dotenv').config()
const {Entrepreneur,Project,Modules,User} = require('../models')

module.exports = {

    // Register User
    async createProject (req, res) {
        try{
            const {sliders,project_type,enterprise_status,advancement,description,IB_network,token} = req.body;
            //Searching for the user if he's an entrepreneur (only the entrepreneur can create a project)
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                if('entrepreneur'.localeCompare(userJson.role) === 0){
                    const entrepreneur = await Entrepreneur.findOne({
                        where: {
                            id_user: userJson.id_user
                        }
                    })
                    if(entrepreneur){
                        const entrepreneurJson = entrepreneur.toJSON();
                        const newProject = await Project.create({
                            enterprise_status: enterprise_status,
                            description: description,
                            advancement: advancement,
                            motivation_IB: IB_network,
                            project_type: project_type,
                            id_entrepreneur: entrepreneurJson.id_entrepreneur
                            
                        })
                        if(newProject){
                            const newProjectJson = newProject.toJSON(); 
                            const newModule = await Modules.create({
                                id_project: newProjectJson.id_project,
                                slider1: sliders["slider1"],
                                slider2: sliders["slider2"],
                                slider3: sliders["slider3"],
                                slider4: sliders["slider4"],
                                slider5: sliders["slider5"]
                            })
                            if(newModule){
                                res.status(200).send({
                                    message: "Your project has been sent"
                                })
                            }
                            else{
                                res.status(400).send({
                                    message: "Internal error"
                                })
                            }
                        }
                        else{
                            res.status(400).send({
                                message: "Internal error"
                            })
                        }
                    }
                    
                }
                else{
                    res.status(401).send({
                        message: "only the entrepreneur can create a project !"
                    })
                }
            }
            else{
                res.status(404).send({
                    message: "user not found"
                })
            }


        }
        catch(err){
            res.status(500).send({
                message: "Internal error"
            })
        }
    },
    async deleteProject(req,res){
        try{
            const {id_project} = req.body;
            const user = await User.findOne({
                where:{
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                //We're searching for the entrepreneur, in order to have its id and check if he has the project
                const entrepreneur = await Entrepreneur.findOne({
                    where: {
                        id_user : userJson.id_user
                    }
                })
                if(entrepreneur){
                    const entrepreneurJson = entrepreneur.toJSON();
                    //We're searching for the project
                    const project = await Project.findOne({
                        where:{
                            id_project: id_project,
                            id_entrepreneur: entrepreneurJson.id_entrepreneur
                        }
                    })
                    if(project){
                        await Project.destroy({
                            where:{
                                id_project: id_project,
                                id_entrepreneur: entrepreneurJson.id_entrepreneur
                            }
                        }).then(() => {
                            res.status(200).send({
                                message: "The project has been deleted"
                            })
                        })
                    }
                    else{
                        res.status(404).send({
                            message: "Project not found"
                        })
                    }
                }
                else{
                    res.status(404).send({
                        message: "Project not found"
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
                message: "Internal error : " + err
            })
        }
    }
}