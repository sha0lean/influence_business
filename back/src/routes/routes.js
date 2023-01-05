
const AuthController = require('../controllers/AuthController.js');
const ModulesController =require('../controllers/ModulesController');
const ProjectController =require('../controllers/ProjectController');
const UserController =require('../controllers/UserController');
const ContactController =require('../controllers/ContactController'); 
const ProfilPicture = require("../controllers/ProfilPictureController");
const verifyToken = require("../middleware/auth.js");
const multer = require("multer");

module.exports = (app) => {
    var imgconfig = multer.diskStorage({
        destination:(req,file,callback) => {
            callback(null,"./uploads")
        },
        filename:(req,file,callback) => {
            callback(null,`image-${Date.now()}.${file.originalname}`)
        }
    })
    //image filter
    const isImage = (req,file,callback)=>{
        if(file.mimetype.startsWith("image")){
            callback(null,true)
        }
        else{
            callback(null,Error("only image is allowed"))
        }
    }

    var upload = multer({
        storage: imgconfig,
        fileFilter: isImage
    })
    app.post('/register',upload.single("file"),AuthController.register);
    app.post('/login',AuthController.login);
    app.post('/createProject',verifyToken,ProjectController.createProject);
    app.post('/getProject',verifyToken,ProjectController.getProject);
    app.post('/getProjects',verifyToken,ProjectController.getProjects);
    app.post('/logout',verifyToken,AuthController.logout);
    app.post('/deleteProject',verifyToken,ProjectController.deleteProject);
    app.post('/deleteUser',verifyToken,UserController.deleteUser);
    app.post('/updateModule',verifyToken,ModulesController.updateModule);
    app.post('/contact',verifyToken,ContactController.contact);
    app.post('/getProjectsAdmin',verifyToken,ProjectController.getAllProjects);
    app.post('/validateProject',verifyToken,ProjectController.validateProject);
    app.post('/forgot-password',AuthController.forgotPassword)
    app.post('/reset-password/:id_user/:token',AuthController.resetPassword);
    app.get('/reset-password/:id_user/:token',AuthController.resetPasswordForm);
    app.post("/getProfilPicture",verifyToken,ProfilPicture.getProfilPicture)
}
