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
                if(userJson.role === 'entrepreneur'){
                    const newProject = await Project.create({
                        enterprise_status: enterprise_status,
                        description: description,
                        advancement: advancement,
                        motivation_IB: IB_network,
                        project_type: project_type,
                        
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
    }
}