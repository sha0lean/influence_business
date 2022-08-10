
const AuthController = require('../controllers/AuthController.js');
const verifyToken = require("../middleware/auth.js");

module.exports = (app) => {
    app.post('/register', AuthController.register);
    app.post('/login',AuthController.login);
}
