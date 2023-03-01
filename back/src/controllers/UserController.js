require("dotenv").config();
const {
    Entrepreneur,
    Project,
    Modules,
    User,
    Expert,
    Role,
    Investor,
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
};
