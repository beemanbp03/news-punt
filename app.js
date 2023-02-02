const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const env = require('dotenv').config({ path: './.env' });

const port = process.env.PORT;

//Config
const publicDirectory = path.join(__dirname, './public'); console.log("app.js file location: " + __dirname);
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false })); //Parses URL-encoded bodies (as sent by HTML forms)
app.use(express.json()); // Parses JSON bodies (as sent by API client)
app.use(cookieParser()); //Parses cookies to setup cookies in the browser


//Declare Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


//Set the template engine to be used when showing html
app.set('view engine', 'hbs');


//Start Server
app.listen(port,  () => {
    console.log("Server started on port " + port);
});
