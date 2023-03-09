require("dotenv").config();
/**
 * We've created a file called config.js, which contains all the config variables
 * such as the database crende ntials and the database which we're using in this project
 */

/**
 * This file contains a module which we export, so we can manipulate it easily, as we do for other modules.
 * port : Our API is listening on port 8000, or in the environment variable port
 * database : which database we use (for instance, ours is called influenceurBusiness.db, we can see it in mysql workbench)
 * user and password : your credentials to log yourself in the database
 * options : we inform which type of database we use (mysql),   host do we use, and where is stored our database
 */
module.exports = {
    //port: process.env.PORT || 5000,
    port: 5000,
    db: {
        database: process.env.DB_NAME,
        user: process.env
            .DB_USER /* You have to enter your database username in the file .env*/,
        password:
            process.env
                .DB_PASS /* You have to enter your database password in the file .env*/,
        options: {
            //database type
            dialect: process.env.DIALECT,
            //database host
            host: process.env.HOST,
            //where the db is stored
            storage: "./influenceurbusiness.mysql",
            port: "3306",
        },
    },
    authentication: {
        //jwtSecret: process.env.JWT_SECRET,
        jwtSecret: "very_secret_name_influenceur_business",
    },
};
