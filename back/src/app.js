//We import the dotenv module in order to have access to the ".env" file
require('dotenv').config({ path: './env' })

const path = require('path')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const express = require('express');

//We get the port number which is declared in the ".env" file
const port = process.env.PORT || 5000;
const auth = require("./middleware/auth.js");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
//We use sequelize in order to simplify the relation with the database
const { sequelize } = require("./models")


const app = express();
//ejs is used to display html pages inside the api. We need it to display the reset password page
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
//In order to access to file by the outside
app.use('/public', express.static('public'))

//We calling the /uploads route, we get the folder public/uploads
app.use('/uploads', express.static('public/uploads'))
//corsOptions is used to allow specific addresses to interact with your API
const corsOptions = {
    //The origin is at which address is your frontend server
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(bodyParser.json());

require('./routes/routes.js')(app);

app.get('/', auth, (req, res) => {
    res.send({
        message: "Hello World"
    });
})

//Synchronization with the database
sequelize.sync()
    .then(() => {

        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        });
    });
