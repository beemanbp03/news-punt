const db = require('./dbController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const env = require('dotenv');
const {promisify} = require('util');
env.config({ path: './.env' });
const hmac = crypto.createHmac('sha256', `${process.env.JWT_SECRET}`);

//Google one-tap config
const {OAuth2Client, IdTokenClient} = require('google-auth-library');
const CLIENT_ID = "116240850493-sg7e4m7oigk1hmik8uee0ikrojshu6t6.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);



//REGISTER Authentication
exports.register = async (req, res) => {
    console.log("Inside authController.register");
    //res.send("Trying to submit form...");

   const {
        email, 
        password, 
        confirmPassword,
        favoriteTeam 
    } = req.body;

    const favoriteTeams = '{"TeamName":"' + favoriteTeam + '"}';


    let emailResults = await db.dbQuery("SELECT email FROM `heroku_ae5ca559b978129`.user WHERE Email = ?", [email], (error, results) => {
        console.log("Inside DBQUERY function");
        if (err) {
            console.log("Error SELECTing email from user: " + err);
            return;
        }
    });

    if (emailResults.length > 0) {
        return res.render('register', {
            message: true,
            messageFail: emailResults[0].email + ' is already in use',
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
    let insertResults = await db.dbQuery("INSERT INTO `heroku_ae5ca559b978129`.user SET ?", {Email: email, Password: hashedPassword, FavoriteTeams: favoriteTeams});
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
    if (req.cookies.jwtGoogle) {
        //DECODE cookie
        const decoded = await promisify(jwt.verify)(req.cookies.jwtGoogle, process.env.JWT_SECRET);
        
        //EDIT cookie
        decoded.FavoriteTeams.TeamName = req.body.favoriteTeam;
        
        //RE-SIGN cookie
        const tokenGoogle = jwt.sign(decoded, process.env.JWT_SECRET);

        //Create Cookie Options
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        //SET new cookie in the response
        res.cookie('jwtGoogle', tokenGoogle, cookieOptions);
    } else {
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
    
        let usernameResults = await db.dbQuery("SELECT username FROM `heroku_ae5ca559b978129`.user WHERE Username = ?", [username], (error, results) => {});
    
        //UPDATE USER IN DATABASE
        let updateUser = await db.dbQuery("UPDATE `heroku_ae5ca559b978129`.user SET ? WHERE Email = '" + email + "'", {FirstName: firstName, LastName: lastName, Email: email, FavoriteTeams: favoriteTeams});
    }
    res.status(200).redirect("/auth/profile");
}

//LOGIN Authentication
exports.login = async (req, res) => {
    try {
        console.log("Inside authController.login");
        const googleToken = req.body.credential;

        console.log(req.body);

        //Google Sign-in************
        if (googleToken) {
            const payload = await googleAuthenticate(googleToken);
            //Create Auth Token
            const header = {'alg':'HS256'}
            const payloadJWT = {
                id: payload['sub'], 
                Username: payload['given_name'], 
                Email: payload['email'], 
                FirstName: payload['given_name'], 
                LastName: payload['family_name'], 
                Picture: payload['picture'], 
                FavoriteTeams: {TeamName: "arizona-cardinals"}
            };
            const tokenGoogle = jwt.sign(payloadJWT, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
    
            //Create Cookie Options
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
    
            res.cookie('jwtGoogle', tokenGoogle, cookieOptions);
            res.status(200).redirect("/home");
        } else {
        //Traditional Sign-in*******************
                const { email, password } = req.body;
                if (!email || !password) {
                     return res.status(400).render('login', {
                        message: true,
                        messageFail: 'Please provide a email and password',
                        messageSuccess: ''
                     });
                }
        
                let loginResults = await db.dbQuery('SELECT * FROM `heroku_ae5ca559b978129`.user WHERE Email = ?', [email]);
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
                    //Create Token
                    const tokenTraditional = jwt.sign({id: id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
        
                    //Create Cookie Options
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
        
                    res.cookie('jwt', tokenTraditional, cookieOptions);
                    res.status(200).redirect("/home");
                }
        }
    } catch (err) {
        console.error(err);
    }
}

//GOOGLE LOGIN Authentication
googleAuthenticate = async (googleToken) => {
    //Google One-Tap Sign in
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    return payload;
}

//CHECK if user is logged in
exports.isLoggedIn = async (req, res, next) => {
    try {
        console.log("INSIDE USER LOGIN CHECK");

        //Check if logged in as Google User********************
        if (req.cookies.jwtGoogle) {
            
                //Verify the Token
                const decoded = await promisify(jwt.verify)(req.cookies.jwtGoogle, process.env.JWT_SECRET);
                //SET the request user with the payload information 
                req.user = decoded;
                return next();
            
        } else {
        //Check if logged in as traditional user*******************
            
        
            if (req.cookies.jwt) {
    
                // 1) Verify the token
                const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
                //console.log(decoded);
    
                // 2) Check if user still exists in database
                let user = await db.dbQuery("SELECT * FROM `heroku_ae5ca559b978129`.user WHERE idUser = ?", [decoded.id]);
    
                // 3) If databse didn't return a user, exit out of function
                if (!user) {
                    return next();
                }
    
                //Turn user's address into a JSON object
                if (user[0].Address) {
                    user[0].Address = JSON.parse(user[0].Address);
                }
    
                //Turn user's favorite teams value into JSON object, modify TeamName, then store in request 
                user[0].FavoriteTeams = JSON.parse(user[0].FavoriteTeams);
                
                // 4) Set the request's user as the user returned by the database
                req.user = user[0];
                if (user[0].Username == 'testUser') {
                    req.admin = true;
                } else {
                    req.admin = false;
                }
    
                return next();
    
            } else {
                next();
            }
        }
    } catch (err) {
        console.error(err);
        return next();
    }
}


//LOGOUT user
exports.logout = async (req, res) => {

    console.log("Inside LOGOUT controller");
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.cookie('jwtGoogle', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).redirect("/home");
}
