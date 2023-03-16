require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/config");

const db = {};
/* Connexion of the libary sequelize to the database using the config variables.*/
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
);

const modelOrder = [
    "User",
    "Role",
    "Admin",
    "Expert",
    "Entrepreneur",
    "Investor",
    "Modules",
    "Project",
    "Competence",
    "SousCompetence",
    "Verify",
    "Contact",
];

modelOrder.forEach((modelName) => {
    const modelDefiner = require(path.join(__dirname, `${modelName}.js`));
    const model = modelDefiner(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

/*
fs.readdirSync(__dirname)
    .filter(function (file) {
        return file !== "index.js";
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });
    */
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
/*
async function createAdmin() {
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
            id_role: roleToJson.id_role,
        });
    } catch (err) {
        console.log("Error:", err);
    }
}

sequelize.sync().then(() => {
    console.log("Database & tables created!");
    createAdmin();
});

*/

db.sequelize = sequelize;
module.exports = db;
