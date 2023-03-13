require("dotenv").config();
const {
    Entrepreneur,
    Project,
    Modules,
    User,
    Expert,
    Role,
    Investor,
    SousCompetence,
    Competence,
} = require("../models");

module.exports = {
    async deleteUser(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    token: global.token,
                },
            });
            if (user) {
                const userJson = user.toJSON();
                //We're searching if the user is an entrepreneur in order to delete all its projects
                const entrepreneur = await Entrepreneur.findOne({
                    where: {
                        id_user: userJson.id_user,
                    },
                });
                if (entrepreneur) {
                    const entrepreneurJson = entrepreneur.toJSON();
                    await Project.findAll({
                        raw: true,
                        where: {
                            id_entrepreneur: entrepreneurJson.id_entrepreneur,
                        },
                    }).then((projects) => {
                        for (let i = 0; i < projects.length; i += 1) {
                            Project.destroy({
                                where: {
                                    id_project: projects[i].id_project,
                                },
                            });
                        }
                    });
                }
                await User.destroy({
                    where: {
                        id_user: userJson.id_user,
                    },
                }).then(() => {
                    res.status(200).send({
                        message: "The user has been deleted",
                    });
                });
            } else {
                res.status(404).send({
                    message: "User not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },
    async getUsername(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    token: global.token,
                },
            });
            if (user) {
                userJson = user.toJSON();
                const username = userJson.first_name + " " + userJson.last_name;
                res.status(200).send({
                    username: username,
                });
            } else {
                res.status(404).send({
                    message: "User not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async getUser(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    token: global.token,
                },
            });
            if (user) {
                userJson = user.toJSON();
                res.status(200).send(userJson);
            } else {
                res.status(404).send({
                    message: "User not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async getExpert(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    token: global.token,
                },
            });
            if (user) {
                const role = await Role.findOne({
                    where: {
                        id_user: user.id_user,
                    },
                });
                if (role) {
                    const expert = await Expert.findOne({
                        where: {
                            id_role: role.id_role,
                        },
                    });
                    if (expert) {
                        const expertJson = expert.toJSON();
                        res.status(200).send(expertJson);
                    } else {
                        res.status(404).send({
                            message: "Expert not found",
                        });
                    }
                } else {
                    res.status(404).send({
                        message: "Role not found",
                    });
                }
            } else {
                res.status(404).send({
                    message: "User not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async getEntrepreneur(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    token: global.token,
                },
            });
            if (user) {
                const role = await Role.findOne({
                    where: {
                        id_user: user.id_user,
                    },
                });
                if (role) {
                    const entrepreneur = await Entrepreneur.findOne({
                        where: {
                            id_role: role.id_role,
                        },
                    });
                    if (entrepreneur) {
                        const entrepreneurJson = entrepreneur.toJSON();
                        res.status(200).send(entrepreneurJson);
                    } else {
                        res.status(404).send({
                            message: "Entrepreneur not found",
                        });
                    }
                } else {
                    res.status(404).send({
                        message: "Role not found",
                    });
                }
            } else {
                res.status(404).send({
                    message: "User not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async getAllEntrepreneurs(req, res) {
        try {
            const entrepreneurs = await Entrepreneur.findAll({
                raw: true,
            });
            if (entrepreneurs) {
                for (let i = 0; i < entrepreneurs.length; i += 1) {
                    const role = await Role.findOne({
                        where: {
                            id_role: entrepreneurs[i].id_role,
                        },
                    });
                    if (role) {
                        const roleJson = role.toJSON();
                        const user = await User.findOne({
                            where: {
                                id_user: roleJson.id_user,
                            },
                        });
                        if (user) {
                            const userJson = user.toJSON();
                            entrepreneurs[i] = {
                                ...entrepreneurs[i],
                                ...userJson,
                            };
                        }
                    }
                }
                res.status(200).send(entrepreneurs);
            } else {
                res.status(404).send({
                    message: "Entrepreneurs not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
            console.log(err);
        }
    },
    async getInvestisseur(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    token: global.token,
                },
            });
            if (user) {
                const role = await Role.findOne({
                    where: {
                        id_user: user.id_user,
                    },
                });
                if (role) {
                    const investisseur = await Investor.findOne({
                        where: {
                            id_role: role.id_role,
                        },
                    });
                    if (investisseur) {
                        const entrepreneurJson = investisseur.toJSON();
                        res.status(200).send(entrepreneurJson);
                    } else {
                        res.status(404).send({
                            message: "Entrepreneur not found",
                        });
                    }
                } else {
                    res.status(404).send({
                        message: "Role not found",
                    });
                }
            } else {
                res.status(404).send({
                    message: "User not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async getIdModuleFromIdRoleEntrepreneur(req, res) {
        console.log(req.body);
        try {
            const project = await Project.findOne({
                where: {
                    id_entrepreneur: req.body.id_entrepreneur,
                },
            });
            console.log("I am here project");
            if (project) {
                const module = await Modules.findOne({
                    where: {
                        id_modules: project.id_module,
                    },
                });
                if (module) {
                    res.status(200).send({
                        id_modules: module.id_modules,
                    });
                } else {
                    res.status(404).send({
                        message: "Module not found",
                    });
                }
            } else {
                res.status(404).send({
                    message: "Project not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async addCompetence(req, res) {
        try {
            const project = await Project.findOne({
                where: {
                    id_entrepreneur: req.body.id_entrepreneur,
                },
            });
            if (project) {
                const module = await Modules.findOne({
                    where: {
                        id_modules: project.id_modules,
                    },
                });
                if (module) {
                    const id_modules = module.id_modules;
                    const newBody = {
                        ...req.body,
                        id_modules,
                    };
                    const competence = await Competence.create({
                        id_entrepreneur: newBody.id_entrepreneur,
                        id_modules: newBody.id_modules,
                        name: newBody.name,
                        value: newBody.value,
                        order: newBody.order,
                    });
                    if (competence) {
                        res.status(200).send({
                            competence: competence,
                        });
                    }
                } else {
                    res.status(404).send({
                        message: "Module not found",
                    });
                }
            } else {
                res.status(404).send({
                    message: "Project not found",
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async addSousCompetence(req, res) {
        try {
            const sousCompetence = await SousCompetence.create({
                ...req.body,
                acquisition: 0,
            });
            if (sousCompetence) {
                res.status(200).send({
                    sousCompetence: sousCompetence,
                });
            } else {
                res.status(404).send({
                    message: "SousCompetence not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async getEntrepreneurCompetences(req, res) {
        try {
            const competences = await Competence.findAll({
                where: {
                    id_entrepreneur: req.body.id_entrepreneur,
                },
            });
            if (competences) {
                res.status(200).send(competences);
            } else {
                res.status(404).send({
                    message: "Competences not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },

    async getEntrepreneurSousCompetences(req, res) {
        console.log(req.body);
        try {
            const sousCompetences = await SousCompetence.findAll({
                where: {
                    id_entrepreneur: req.body.id_entrepreneur,
                },
            });
            if (sousCompetences) {
                res.status(200).send(sousCompetences);
            } else {
                res.status(404).send({
                    message: "Competences not found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Internal error",
            });
        }
    },
};
