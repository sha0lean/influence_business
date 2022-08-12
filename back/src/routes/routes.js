
const AuthController = require('../controllers/AuthController.js');
const ModulesController =require('../controllers/ModulesController');
const ProjectController =require('../controllers/ProjectController');
const UserController =require('../controllers/UserController');
const verifyToken = require("../middleware/auth.js");

module.exports = (app) => {
    app.post('/register', AuthController.register);
    app.post('/login',AuthController.login);
    app.post('/createProject',verifyToken,ProjectController.createProject);
    app.post('/logout',verifyToken,AuthController.logout);
    app.post('/deleteProject',verifyToken,ProjectController.deleteProject);
    app.post('/deleteUser',verifyToken,UserController.deleteUser);
}
