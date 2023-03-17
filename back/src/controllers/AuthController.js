require("dotenv").config();
const {
    User,
    Investor,
    Expert,
    Entrepreneur,
    Role,
    Project,
    Modules,
    Competence,
    SousCompetence,
} = require("../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// password hash
const bcrypt = require("bcrypt");
// later for contact form
let nodemailer = require("nodemailer");
// things like "one hour ago"
const moment = require("moment");

// autocomplete le projectform
const staticCompetences = [
    {
        module: "Définition du projet",
        competences: [
            {
                name: "Résumé Global & Equipe",
                subCompetences: ["Résumé global", "Equipe"],
            },
            {
                name: "Modèle économique",
                subCompetences: ["Modèle économique", "Chiffres clés"],
            },
        ],
    },
    {
        module: "Analyse du projet et choix stratégique",
        competences: [
            {
                name: "Votre marché",
                subCompetences: [
                    "Analyse du marché",
                    "Segmentation",
                    "Positionnement",
                ],
            },
            {
                name: "Votre marché",
                subCompetences: [
                    "Analyse du marché",
                    "Segmentation",
                    "Positionnement",
                ],
            },
            {
                name: "Risques & Opportunités",
                subCompetences: ["Risques", "Opportunités"],
            },
        ],
    },
    {
        module: "Plans opérationnels et financiers",
        competences: [
            {
                name: "Stratégie & Marketing",
                subCompetences: ["Stratégie", "Marketing"],
            },
            {
                name: "Gestion de projet",
                subCompetences: ["Gestion de projet", "Planification"],
            },
            {
                name: "Viabilité & Financement",
                subCompetences: ["Viabilité", "Financement"],
            },
        ],
    },
    {
        module: "Action de développement",
        competences: [
            {
                name: "Communication & Relations publiques",
                subCompetences: [
                    "Communication",
                    "Relations publiques",
                    "Relations presse",
                ],
            },
            {
                name: "Gestion de la relation client",
                subCompetences: ["Gestion de la relation client"],
            },
            {
                name: "Gestion des ressources humaines",
                subCompetences: ["Gestion des ressources humaines"],
            },
        ],
    },
];

function jwtSignUser(user) {
    const secretKey = process.env.JWT_SECRET;
    //We generate the secretKey
    const token = jwt.sign(
        {
            username: user.email,
            firstname: user.first_name,
            lastname: user.last_name,
        },
        secretKey,
        {
            expiresIn: "24h",
        }
    );
    if (token) {
        // We create the hash sha256 using the TOKEN_KEY
        const sha256Hasher = crypto.createHmac(
            "sha256",
            process.env.JWT_SECRET
        );
        if (sha256Hasher) {
            //We hash our token
            const tokenHashed = sha256Hasher.update(token).digest("hex");
            user = User.update(
                {
                    token: tokenHashed,
                },
                {
                    where: {
                        email: user.email,
                    },
                }
            );
            if (user) {
                return token;
            }
        }
    }
}

module.exports = {
    async createAdmin() {
        try {
            const newUser = await User.create({
                email: "admin",
                password: "admin",
                first_name: "Admin",
                last_name: "",
                work_status: false,
            });

            const userJson = newUser.toJSON();
            const token = jwtSignUser(userJson);
            //We fill the tables specific to the role
            roleToJson = await Role.create({
                id_user: userJson.id_user,
                role_name: "admin",
            });
            roleToJson = roleToJson.toJSON();
            const admin = await Admin.create({
                id_admin: userJson.id_user,
                id_role: roleToJson.id_role,
            });
        } catch (err) {
            console.log("Error:", err);
        }
    },
    // Register User
    async register(req, res) {
        if (req.body.role === "entrepreneur") {
            var {
                email,
                password,
                first_name,
                last_name,
                role,
                presentation,
                theme_interesting,
                projectName,
                projectTheme,
                projectValue,
                projectDescription,
                montantInvestissement,
                modulesValues,
            } = req.body;
        } else if (req.body.role === "investor") {
            var {
                email,
                password,
                first_name,
                last_name,
                role,
                themeProject,
                company,
                description,
            } = req.body;
        } else if (req.body.role === "expert") {
            var {
                email,
                password,
                first_name,
                last_name,
                role,
                presentation,
                experiences,
                work,
                diplomes,
                theme_interesting,
            } = req.body;
        }
        var { filename } = req.file;
        try {
            let isUserAlreadyExist = true;
            const fetchUser = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (!fetchUser) {
                isUserAlreadyExist = false;
            }
            if (isUserAlreadyExist == false) {
                //If the image doesn't exist
                if (filename == undefined) {
                    res.status(500).send({
                        message:
                            "Vous devez sélectionnez une photo de profil !",
                    });
                } else {
                    //Prevent the user from registering himself as admin
                    role_verify = role;
                    if ("expert".localeCompare(role_verify) === 0) {
                        role_verify = "expert";
                    } else if ("investor".localeCompare(role_verify) === 0) {
                        role_verify = "investor";
                    } else {
                        role_verify = "entrepreneur";
                    }

                    //Creation file name
                    const newUser = await User.create({
                        email: email,
                        password: password,
                        first_name: first_name,
                        last_name: last_name,
                        work_status: false,
                        fileName: filename,
                    });

                    const userJson = newUser.toJSON();
                    const token = jwtSignUser(userJson);
                    //We fill the tables specific to the role
                    if (role.localeCompare("investor") === 0) {
                        roleToJson = await Role.create({
                            id_user: userJson.id_user,
                            role_name: "investor",
                        });
                        if (roleToJson) {
                            roleToJson = roleToJson.toJSON();
                            const investor = await Investor.create({
                                id_user: userJson.id_user,
                                theme_interesting: themeProject,
                                name_company: company,
                                description: description,
                                id_role: roleToJson.id_role,
                            });
                        }
                    } else if (role.localeCompare("expert") === 0) {
                        var {
                            email,
                            password,
                            first_name,
                            last_name,
                            role,
                            presentation,
                            experiences,
                            work,
                            diplomes,
                            theme_interesting,
                        } = req.body;
                        roleToJson = await Role.create({
                            id_user: userJson.id_user,
                            role_name: "expert",
                        });
                        if (roleToJson) {
                            roleToJson = roleToJson.toJSON();
                            const expert = await Expert.create({
                                id_role: roleToJson.id_role,
                                presentation: presentation,
                                experiences: experiences,
                                work: work,
                                diplomes: diplomes,
                                theme_interesting: theme_interesting,
                            });
                        }
                    } else {
                        role = await Role.create({
                            id_user: userJson.id_user,
                            role_name: "entrepreneur",
                        });

                        if (role) {
                            roleToJson = role.toJSON();
                            const entrepreneur = await Entrepreneur.create({
                                id_role: roleToJson.id_role,
                                presentation: presentation,
                                theme_interesting: theme_interesting,
                                projectName: projectName,
                                projectTheme: projectTheme,
                                projectValue: projectValue,
                                projectDescription: projectDescription,
                                montantInvestissement: montantInvestissement,
                                modulesValues: modulesValues,
                            });
                            const entrepreneurJson = entrepreneur.toJSON();

                            if (roleToJson) {
                                const modules = await Modules.create({
                                    sliders: modulesValues,
                                    //name_sliders: nameModules,
                                });
                                if (modules) {
                                    const modulesJson = modules.toJSON();
                                    const project = await Project.create({
                                        project_name: projectName,
                                        id_entrepreneur:
                                            entrepreneurJson.id_entrepreneur,
                                        description: projectDescription,
                                        //motivation_IB: projectTheme,
                                        id_modules: modulesJson.id_modules,
                                        montant_investissement:
                                            montantInvestissement,
                                        project_value: projectValue,
                                        project_type: projectTheme,
                                    });

                                    staticCompetences.forEach(
                                        (module, index) => {
                                            console.log("staticCompetences");
                                            module.competences.forEach(
                                                async (competence) => {
                                                    const newCompetence =
                                                        await Competence.create(
                                                            {
                                                                name: competence.name,
                                                                id_entrepreneur:
                                                                    entrepreneurJson.id_entrepreneur,
                                                                id_modules:
                                                                    modulesJson.id_modules,
                                                                order: index,
                                                                value: 0,
                                                            }
                                                        );
                                                    const newCompetenceJson =
                                                        newCompetence.toJSON();
                                                    if (newCompetenceJson) {
                                                        competence.subCompetences.forEach(
                                                            async (
                                                                sousCompetence
                                                            ) => {
                                                                const newSousCompetence =
                                                                    await SousCompetence.create(
                                                                        {
                                                                            id_competence:
                                                                                newCompetenceJson.id_competence,
                                                                            id_entrepreneur:
                                                                                entrepreneurJson.id_entrepreneur,
                                                                            name: sousCompetence,
                                                                            acquisition: 0,
                                                                            value: 0,
                                                                        }
                                                                    );
                                                            }
                                                        );
                                                    } else {
                                                        res.status(500).send({
                                                            message:
                                                                "Une erreur interne est survenue. Veuillez réessayer : " +
                                                                err,
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    );
                                }
                            }
                        }
                    }
                    global.token = token;
                    res.status(200).json({
                        token: token,
                        role: roleToJson.role_name,
                        message: "Inscription valide",
                    });
                }
            } else {
                res.status(500).send({
                    message:
                        "Cet email existe déjà. Veuillez en utiliser un autre",
                });
            }
        } catch (err) {
            res.status(500).send({
                message:
                    "Une erreur interne est survenue. Veuillez réessayer : " +
                    err,
            });
        }
    },

    // Login User
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                res.status(401).send({
                    message:
                        "L'utilisateur n'a pas été trouvé. Veuillez réessayer",
                });
            } else {
                const role = await Role.findOne({
                    where: {
                        id_user: user.toJSON().id_user,
                    },
                });
                if (role) {
                    const roleJson = role.toJSON();
                    if (roleJson.role_name === "admin") {
                        const userJson = user.toJSON();
                        const token = jwtSignUser(userJson);
                        global.token = token;

                        res.status(200).send({
                            token: token,
                            role: roleJson.role_name,
                            filename: userJson.fileName,
                            message: "Vos identifiants sont corrects",
                        });
                    }
                } else {
                    await user.comparePassword(password).then((isMatch) => {
                        if (!isMatch) {
                            res.status(401).send({
                                message:
                                    "L'utilisateur n'a pas été trouvé. Veuillez réessayer",
                            });
                        } else {
                            const userJson = user.toJSON();
                            const token = jwtSignUser(userJson);
                            global.token = token;

                            res.status(200).send({
                                token: token,
                                role: roleJson.role_name,
                                filename: userJson.fileName,
                                message: "Vos identifiants sont corrects",
                            });
                        }
                    });
                }
            }
        } catch (err) {
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer",
            });
        }
    },
    async logout(req, res) {
        try {
            const token = global.token;
            const user = await User.findOne({
                where: {
                    token: token,
                },
            });
            if (user) {
                const userJson = user.toJSON();
                await User.update(
                    {
                        token: jwtSignUser(userJson),
                    },
                    {
                        where: {
                            id_user: userJson.id_user,
                        },
                    }
                ).then(() => {
                    res.status(200).send({
                        message: "The user has been disconnected",
                    });
                });
            } else {
                res.status(404).send({
                    message: "The user has not been found",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer",
            });
        }
    },
    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                res.status(404).send({
                    error: "L'utilisateur n'a pas été trouvé. Veuillez réessayer",
                    message: "",
                    mailSent: false,
                });
            } else {
                const token = jwtSignUser(user);
                const link = `http://localhost:5000/reset-password/${user.id_user}/${token}`;
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "influenceur.business@gmail.com",
                        pass: "bmxjrpsnoxuxxkcf",
                    },
                });

                var mailOptions = {
                    from: "influenceur.business@gmail.com",
                    to: user.toJSON().email,
                    subject: "Réinitialisation de mot de passe",
                    text: link,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.status(500).send({
                            error: "Une erreur est survenue. Veuillez réessayer",
                            message: "",
                            mailSent: false,
                        });
                    } else {
                        res.status(200).send({
                            error: "",
                            message:
                                "Un email vous a été envoyé. Veuillez vérifier votre boîte mail.",
                            mailSent: true,
                        });
                    }
                });
            }
        } catch (err) {
            res.status(500).send({
                error: "Une erreur est survenue. Veuillez réessayer",
                message: "",
                mailSent: false,
            });
        }
    },
    async resetPasswordForm(req, res) {
        const { id_user, token } = req.params;
        //Verification of the token
        try {
            const sha256Hasher = crypto.createHmac(
                "sha256",
                process.env.JWT_SECRET
            );
            if (sha256Hasher) {
                const tokenHashed = sha256Hasher.update(token).digest("hex");
                const user = await User.findOne({
                    where: {
                        token: tokenHashed,
                    },
                });
                if (user) {
                    const userJson = user.toJSON();
                    res.render("index", { errorMessage: "" });
                } else {
                    res.status(404).send({
                        message: "L'utilisateur n'a pas été trouvé",
                    });
                }
            } else {
                res.status(500).send({
                    message:
                        "Une erreur interne est survenue. Veuillez réessayer",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer",
            });
        }
    },
    async resetPassword(req, res) {
        const { id_user, token } = req.params;
        const { password, confirmPassword } = req.body;

        //Verification of the token
        try {
            if (password != confirmPassword) {
                res.render("index", {
                    errorMessage:
                        "Les deux mots de passe sont différents. Veuillez réessayer",
                });
            } else {
                let sha256Hasher = crypto.createHmac(
                    "sha256",
                    process.env.JWT_SECRET
                );
                if (sha256Hasher) {
                    const tokenHashed = sha256Hasher
                        .update(token)
                        .digest("hex");
                    const user = await User.findOne({
                        where: {
                            token: tokenHashed,
                        },
                    });
                    if (user) {
                        const userJson = user.toJSON();
                        const token = jwtSignUser(userJson);
                        sha256Hasher = crypto.createHmac(
                            "sha256",
                            process.env.JWT_SECRET
                        );
                        const tokenHashed = sha256Hasher
                            .update(token)
                            .digest("hex");
                        await User.update(
                            {
                                password: password,
                                token: tokenHashed,
                            },
                            {
                                where: {
                                    id_user: userJson.id_user,
                                },
                                individualHooks: true,
                            }
                        );
                        res.render("success");
                    } else {
                        res.status(404).send({
                            message: "L'utilisateur n'a pas été trouvé",
                        });
                    }
                } else {
                    res.status(500).send({
                        message:
                            "Une erreur interne est survenue. Veuillez réessayer",
                    });
                }
            }
        } catch (err) {
            res.status(500).send({
                message:
                    "Une erreur interne est survenue. Veuillez réessayer : " +
                    err,
            });
        }
    },
};
