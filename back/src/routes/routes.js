// ——— controllers —————————————————————————————————————————————————————————
const AuthController = require("../controllers/AuthController.js");
const UserController = require("../controllers/UserController");
const ProfilPicture = require("../controllers/ProfilPictureController");
const ProjectController = require("../controllers/ProjectController");
const ModulesController = require("../controllers/ModulesController");
const ContactController = require("../controllers/ContactController");

const verifyToken = require("../middleware/auth.js");
const multer = require("multer");

// ————————————————————————————————————————————————————————————————————————————————————————————————

module.exports = (app) => {
    //We store the images into the folder public/uploads
    var imgconfig = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "public/uploads");
        },
        filename: (req, file, callback) => {
            //We place the date on the image name
            callback(null, `image-${Date.now()}.${file.originalname}`);
        },
    });
    //image filter
    const isImage = (req, file, callback) => {
        if (file.mimetype.startsWith("image")) {
            callback(null, true);
        } else {
            callback(null, Error("only image is allowed"));
        }
    };

    var upload = multer({
        storage: imgconfig,
        fileFilter: isImage,
    });

    // ——— authentification —————————————————————————————————————————————————————————
    app.post("/register", upload.single("file"), AuthController.register);
    app.post("/login", AuthController.login);
    app.post("/logout", verifyToken, AuthController.logout);
    app.post("/contact", verifyToken, ContactController.contact);
    app.post("/forgot-password", AuthController.forgotPassword);
    app.post("/reset-password/:id_user/:token", AuthController.resetPassword);
    app.get(
        "/reset-password/:id_user/:token",
        AuthController.resetPasswordForm
    );

    // ——— user —————————————————————————————————————————————————————————————————————
    app.post(
        "/addSousCompetence",
        verifyToken,
        UserController.addSousCompetence
    );
    app.post(
        "/entrepreneurCompetences",
        verifyToken,
        UserController.getEntrepreneurCompetences
    );
    app.post(
        "/entrepreneurSousCompetences",
        verifyToken,
        UserController.getEntrepreneurSousCompetences
    );
    app.post(
        "/saveSousCompetence",
        verifyToken,
        UserController.updateSousCompetence
    );
    app.post(
        "/saveEntrepreneur",
        verifyToken,
        UserController.updateEntrepreneur
    );
    app.post("/addCompetence", verifyToken, UserController.addCompetence);
    app.post("/entrepreneurs", verifyToken, UserController.getAllEntrepreneurs);
    app.post("/expert", verifyToken, UserController.getExpert);
    app.post("/entrepreneur", verifyToken, UserController.getEntrepreneur);
    app.post("/investisseur", verifyToken, UserController.getInvestisseur);
    app.post("/user", verifyToken, UserController.getUser);
    app.post("/getUsername", verifyToken, UserController.getUsername);
    app.post("/deleteUser", verifyToken, UserController.deleteUser);
    app.post("/getProfilPicture", verifyToken, ProfilPicture.getProfilPicture);

    // ——— projects —————————————————————————————————————————————————————————————————
    app.post("/createProject", verifyToken, ProjectController.createProject);
    app.post("/deleteProject", verifyToken, ProjectController.deleteProject);
    app.post("/getProject", verifyToken, ProjectController.getProject);
    app.post("/getProjects", verifyToken, ProjectController.getProjects);
    app.post(
        "/getProjectsAdmin",
        verifyToken,
        ProjectController.getAllProjects
    );
    app.post(
        "/validateProject",
        verifyToken,
        ProjectController.validateProject
    );
    app.post("/getModules", verifyToken, ModulesController.getModules);
    app.post("/updateModule", verifyToken, ModulesController.updateModule);
};
