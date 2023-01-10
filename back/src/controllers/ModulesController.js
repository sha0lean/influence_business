require('dotenv').config()
const { Admin, User, Modules, Role, Entrepreneur, Project } = require('../models')

module.exports = {

    // Register User
    async updateModule(req, res) {
        try {
            const { id_module, slider1, slider2, slider3, slider4, slider5, token } = req.body;
            const user = await User.findOne({
                where: {
                    token: global.token
                }
            })
            if (user) {
                const userJson = user.toJSON()
                if ('admin'.localeCompare(userJson.role) === 0) {
                    const modules = await Modules.findOne({
                        where: {
                            id_modules: id_module
                        }
                    })
                    if (modules) {
                        await Modules.update({
                            slider1: slider1,
                            slider2: slider2,
                            slider3: slider3,
                            slider4: slider4,
                            slider5: slider5
                        },
                            {
                                where: {
                                    id_modules: id_module
                                }
                            }).then(() => {
                                res.status(200).send({
                                    message: "The module has been updated"
                                })
                            })
                    }
                    else {
                        res.status(404).send({
                            message: "Module not found"
                        })
                    }
                }
                else {
                    res.status(401).send({
                        message: "You're not authorized to update modules"
                    })
                }
            }
        }
        catch (err) {
            res.status(500).send({
                message: "Erreur interne"
            })
        }
    },
    async getModules(req, res) {
        try {
            const token = global.token
            const user = await User.findOne({
                where: {
                    token: token
                }
            })
            if (user) {
                const userJson = user.toJSON()
                const role = await Role.findOne({
                    where: {
                        id_user: userJson.id_user
                    }
                })
                if (role) {
                    const roleJson = role.toJSON()

                    if (roleJson.role_name === "entrepreneur") {
                        const entrepreneur = await Entrepreneur.findOne({
                            where: {
                                id_role: roleJson.id_role
                            }
                        })
                        if (entrepreneur) {
                            const entrepreneurJson = entrepreneur.toJSON();
                            const project = await Project.findOne({
                                where: {
                                    id_entrepreneur: entrepreneurJson.id_entrepreneur
                                }
                            })
                            if (project) {
                                const projectJson = project.toJSON();
                                const modules = await Modules.findOne({
                                    where: {
                                        id_modules: projectJson.id_modules
                                    }
                                })
                                if (modules) {
                                    const modulesJson = modules.toJSON();
                                    res.status(200).send({
                                        sliders: modulesJson.sliders,
                                        name_sliders: modulesJson.name_sliders
                                    })
                                }
                                else {
                                    res.status(404).send({
                                        message: "L'utilisateur n'a pas été trouvé"
                                    })
                                }
                            }
                            else {
                                res.status(404).send({
                                    message: "L'utilisateur n'a pas été trouvé"
                                })
                            }
                        }
                        else {
                            res.status(404).send({
                                message: "L'utilisateur n'a pas été trouvé"
                            })
                        }
                    }
                    else {
                        res.status(404).send({
                            message: "L'utilisateur n'a pas de modules associés"
                        })
                    }
                }
            }
            else {
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé"
                })
            }
        }
        catch (err) {
            res.status(500).send({
                message: "Erreur interne " + err
            })
        }
    }
}