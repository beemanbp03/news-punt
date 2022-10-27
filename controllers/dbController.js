const mysql = require('mysql');
const env = require('dotenv');
env.config({ path: './.env' });

/*
Simple query function that creates a promise, creates a db connection, attempts a query, 
then closes the connection once the promise is resolved.
*/
exports.dbQuery = (query, queryVar) => {
    return new Promise((resolve, reject) => {
        //The Promise constructor should catch any errors thrown
        //on this tick.  Alternatively, try/catch and reject(err) on catch.
        var connection = dbConnect();

        connection.query(query, queryVar, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                //console.log("Results inside dbController" + JSON.stringify(rows));
                resolve(rows);
            }
        });
        connection.end();
    });
}

//Local function to connect with the database (params: {test}:boolean is the test or production database being used)
dbConnect = () => {
    
    var config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT
    }
    
    //Create Database Connection
    const db = mysql.createConnection(config);
    //console.log(config.name);
    return db;
}

