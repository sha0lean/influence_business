require('dotenv').config()
const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const config = require("../config/config");

const db = {}
console.log("database : mysql")
console.log("vzfjoife")
console.log("config db database : ", config.db.database)
/* Connexion of the libary sequelize to the database using the config variables.*/
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
);



fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return file !== 'index.js'
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    }); Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;