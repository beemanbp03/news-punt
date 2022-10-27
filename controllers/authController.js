const db = require('./dbController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('dotenv');
const {promisify} = require('util');
env.config({ path: './.env' });

//REGISTER Authentication
exports.register = async (req, res) => {
    console.log("Inside authController.register");
    console.log(req.body);
    //res.send("Trying to submit form...");

   const {
        username, 
        password, 
        confirmPassword,
        firstName,
        lastName,
        email,
        birthdate,
        phone,
        street,
        unitNumber,
        city,
        zip,
        country,
        favoriteTeam 
    } = req.body;

    const phoneEnabled = 0;
    const address = '{"street": "' + street + '", "unitNumber": "' + unitNumber + '", "city": "' + city + '", "zip": "' + zip + '", "country": "' + country + '"}';
    const favoriteTeams = '{"TeamName":"' + favoriteTeam + '"}'


    let emailResults = await db.dbQuery("SELECT email FROM `news-punt-db-test`.user WHERE Email = ?", [email], (error, results) => {
        console.log("Inside DBQUERY function");
        if (err) {
            console.log("Error SELECTing email from user: " + err);
            return;
        }
    });

    let usernameResults = await db.dbQuery("SELECT username FROM `news-punt-db-test`.user WHERE Username = ?", [username], (error, results) => {

    });

    if (emailResults.length > 0) {
        return res.render('register', {
            message: true,
            messageFail: 'That email is already in use',
            messageSuccess: ''
        });
    } else if (usernameResults.length > 0) {
        return res.render('register', {
            message: true,
            messageFail: 'That username is already in use',
            messageSuccess: ''
        });
    } else if ( password !== confirmPassword) {
        return res.render('register', {
            message: true,
            messageFail: 'Passwords do not match',
            messageSuccess: ''
        });
    }

    let hashedPassword = await bcrypt.hash(password, 8);

    //INSERT NEW USER INTO DATABASE
    let insertResults = await db.dbQuery("INSERT INTO `news-punt-db-test`.user SET ?", {Username: username, Password: hashedPassword, FirstName: firstName, LastName: lastName, Email: email, Birthdate: birthdate, Phone: phone, Address: address, PhoneEnabled: phoneEnabled, FavoriteTeams: favoriteTeams});
    if (insertResults) {
        res.render('register', {
            message: true,
            messageFail: '',
            messageSuccess: 'User registered'
        });
    }
}

//EDIT PROFILE information
exports.editProfile = async (req, res) => {
    console.log("Inside authController.editProfile");
    console.log(req.body);
    //res.send("Trying to submit form...");

   const {
        username, 
        password, 
        confirmPassword,
        firstName,
        lastName,
        email,
        birthdate,
        phone,
        street,
        unitNumber,
        city,
        zip,
        country,
        favoriteTeam 
    } = req.body;

    const phoneEnabled = 0;
    const address = '{"street": "' + street + '", "unitNumber": "' + unitNumber + '", "city": "' + city + '", "zip": "' + zip + '", "country": "' + country + '"}';
    const favoriteTeams = '{"TeamName":"' + favoriteTeam + '"}';

    let usernameResults = await db.dbQuery("SELECT username FROM `news-punt-db-test`.user WHERE Username = ?", [username], (error, results) => {});

    //UPDATE USER IN DATABASE
    let updateUser = await db.dbQuery("UPDATE `news-punt-db-test`.user SET ? WHERE Email = '" + email + "'", {FirstName: firstName, LastName: lastName, Email: email, FavoriteTeams: favoriteTeams});
    res.status(200).redirect("/auth/profile");
}

//LOGIN Authentication
exports.login = async (req, res) => {
    try {
        console.log("Inside authController.login");
        const { username, password } = req.body;
        if (!username || !password) {
             return res.status(400).render('login', {
                message: true,
                messageFail: 'Please provide a username and password',
                messageSuccess: ''
             });
        }

        let loginResults = await db.dbQuery('SELECT * FROM `news-punt-db-test`.user WHERE Username = ?', [username]);
        console.log("Login Results: " + JSON.stringify(loginResults));
        //Check Failed login due to incorrect info
        if (!loginResults || !(await bcrypt.compare(password, loginResults[0].Password))) {
            console.log("USERNAME PASSWORD CHECK FAILED");
            res.status(401).render('login', {
                message: true,
                messageFail: 'information incorrect',
                messageSuccess: ''
            });
        }else {
            const id = loginResults[0].idUser;
            console.log(id);
            //Create Token
            const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            console.log("The token is: " + token);

            //Create Cookie Options
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect("/home");
        }

    } catch (err) {
        console.log(err);
    }
}

//CHECK if user is logged in by 
exports.isLoggedIn = async (req, res, next) => {
    console.log("INSIDE USER LOGIN CHECK");
    console.log(req.cookies);

    try {

        //Get news-punt-db.teams info for request
        let query = "SELECT * from `news-punt-db-test`.teams";

        if (req.cookies.jwt) {

            // 1) Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            //console.log(decoded);

            // 2) Check if user still exists in database
            let user = await db.dbQuery("SELECT * FROM `news-punt-db-test`.user WHERE idUser = ?", [decoded.id]);
            console.log(user);

            // 3) If databse didn't return a user, exit out of function
            if (!user) {
                return next();
            }

            //Turn user's address into a JSON object
            user[0].Address = JSON.parse(user[0].Address);
            console.log(user[0].Address);

            //Turn user's favorite teams value into JSON object, modify TeamName, then store in request 
            user[0].FavoriteTeams = JSON.parse(user[0].FavoriteTeams);
            
            // 4) Set the request's user as the user returned by the database
            req.user = user[0];
            if (user[0].Username == 'testUser') {
                req.admin = true;
            } else {
                req.admin = false;
            }


            console.log(req.user.FavoriteTeams.TeamName);
            return next();

        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        return next();
    }
}


//LOGOUT user
exports.logout = async (req, res) => {

    console.log("Inside LOGOUT controller");
    res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2*1000),
    httpOnly: true
    });
    res.status(200).redirect("/admin");
}
