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
                message: "Internal error : " + err 
            })
        }
    },
    async getProject(req,res){
        try{
            const {id_project}  = req.body
            const user = await User.findOne({
                where:{
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                const entrepreneur = await Entrepreneur.findOne({
                    where: {
                        id_user: userJson.id_user
                    }
                })
                if(entrepreneur){
                    const entrepreneurJson = entrepreneur.toJSON();
                    const project = await Project.findOne({
                        where:{
                            id_entrepreneur: entrepreneurJson.id_entrepreneur,
                            id_project: id_project
                        }
                    })

                    if(project){
                        const projectJson = project.toJSON();

                        res.status(200).send({
                            message: "Project found",
                            first_name: userJson.first_name,
                            last_name: userJson.last_name,
                            email: userJson.email,
                            description: projectJson.description,
                            enterprise_status: projectJson.enterprise_status,
                            advancement: projectJson.advancement,
                            motivation_IB: projectJson.motivation_IB,
                            project_type: projectJson.project_type,
                            state_validation: projectJson.state_validation
                        })
                        
                    }
                    else{
                        res.status(404).send({
                            message: "The project has not been found"
                        })
                    }
                }
                else{
                    res.status(401).send({
                        message: "You're not authorized to see the project"
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
    },
    async getProjects(req,res){
        try{
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                const entrepreneur = await Entrepreneur.findOne({
                    where: {
                        id_user: userJson.id_user
                    }
                })
                if(entrepreneur){
                    const entrepreneurJson = entrepreneur.toJSON();
                    const projects = await Project.findAll({
                        raw: true,
                        where: {
                            id_entrepreneur: entrepreneurJson.id_entrepreneur
                        }
                    })
                    if(projects){
                        let project = {
                            id_project: 0,
                            description: "",
                            enterprise_status: "",
                            advancement: "",
                            motivation_IB: "",
                            project_type: "",
                            score: 0
                        }
                        let arrayProjects = []
                        for(let i =0;i<projects.length;i+=1){
                            project = {
                                id_project: 0,
                                description: "",
                                enterprise_status: "",
                                advancement: "",
                                motivation_IB: "",
                                project_type: "",
                                score: 0
                            }
                            //We search the modules in order to calculate the score
                            let module = await Modules.findOne({
                                where: {
                                    id_project: projects[i].id_project
                                }
                            })
                            if(module){
                                let counterElement = 0;
                                let moduleJson = module.toJSON();
                                project.id_project = projects[i].id_project
                                project.description = projects[i].description
                                project.enterprise_status = projects[i].enterprise_status
                                project.advancement = projects[i].advancement
                                project.motivation_IB = projects[i].motivation_IB
                                project.project_type = projects[i].project_type
                                
                                //We delete the ids as we don't need them to calculate the score
                                delete moduleJson.id_modules;
                                delete moduleJson.id_project;
                                for(let l in moduleJson){
                                    if(typeof(moduleJson[l]) === "number"){
                                        project.score+=moduleJson[l];
                                        counterElement+=1   
                                    }
                                }
                                project.score = Math.round(project.score/counterElement);
                                arrayProjects.push(project);
                            }
                        }
                        res.status(200).send({
                            message: "Project found",
                            data : arrayProjects
                        })
                    }
                    else{
                        res.status(404).send({
                            message: "Projects not found"
                        })
                    }
                }
                else{
                    res.status(401).send({
                        message: "You can't see the projects"
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
    },
    async getAllProjects(req,res){
        try{
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })   
            if(user){
                const userJson = user.toJSON();
                if("admin".localeCompare(userJson.role) == 0){
                    const projects = await Project.findAll({
                        raw: true
                    });
                    if(projects){
                        res.status(200).send({
                            message: "Projects found",
                            projects: projects
                        })
                    }
                    else{
                        res.status(404).send({
                            message: "Project not found"
                        })

                    }
                    
                }   
                else{
                    res.status(401).send({
                        message: "You're not authorized to see these resources"
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
    },
    async validateProject(req,res){
        try{
            const {id_project} = req.body
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON()
                if("admin".localeCompare(userJson.role) == 0){
                    const project = await Project.update({
                        state_validation: 1
                    },
                    {
                        where: {
                            id_project: id_project
                        }
                    })
                    if(project){
                        res.status(200).send({
                            message: "The project has been updated"
                        })
                    }
                    else{
                        res.status(500).send({
                            message: "Internal error"
                        })
                    }
                } 

                else{
                    res.status(401).send({
                        message: "You're not authorized to do this action"
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
                message: "Internal error"
            })
        }
    }
}