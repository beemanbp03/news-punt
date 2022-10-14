const chai = require('chai');
const db = require('../controllers/dbController');
const test = 1;

const assert = chai.assert;
const expect = chai.expect;

//SELECT tests
describe('SELECT tests', () => {
   beforeEach (async () => {
      await db.dbQuery('TRUNCATE TABLE `news-punt-db-test`.user');
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Beeman', 'Boulder', 'beemanbp03', 'root', 'boulder@gmail.com', '1992-12-12', null, null, 0, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Smith', 'Mike', 'SmithM12', 'delikad', 'mikesmith@email.com', '1987-09-24', '(865)653-3423', null, 1, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Johnson', 'Claire', 'JohnsonC23', 'RosesAreRed', 'johnsonc@email.com', '1999-04-15', '(865)653-6534', null, 0, null, null);");
      //await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Mike', 'Smith', 'smithMike', 'smith33452', 'smith@email.com', '1974-03-02', '(123)456-7890', '[{'street':'124 Willow ave','unitNumber':'320','city':'Madison', 'zip':'53704','country':'United States'}]', 1, [{'teams':'['green-bay-packers']', 'players':'['Devonta Adams']}]);");
   });
   it ('Should SELECT * FROM user', async () => {
      // https://devdotcode.com/interact-with-mysql-database-using-async-await-promises-in-node-js/
      
      const queryVar = '.user';
      const query = "SELECT * FROM `news-punt-db-test`" + queryVar;

      //Use an asynchonous function to return the database query results
      let results = await db.dbQuery(query, test);
      //console.log(results);
      assert.equal("Beeman", results[0].LastName, 'Beeman is equal to results[0].lastName');
      assert.lengthOf(results, 3, 'There are exactly 3 users');
   });

   it ('Should SELECT email from first user', async () => {
      let email = 'boulder@gmail.com';
      let results = await db.dbQuery("SELECT email FROM `news-punt-db-test`.user WHERE Email = ?", [email], test);
      
      console.log(results);
      assert.equal('boulder@gmail.com', results[0].email);
   });

   it ('Should SELECT * FROM teams', async () => {
      // https://devdotcode.com/interact-with-mysql-database-using-async-await-promises-in-node-js/
      
      const queryVar = '.teams';
      const query = "SELECT * FROM `news-punt-db-test`" + queryVar;

      //Use an asynchonous function to return the database query results
      let results = await db.dbQuery(query, test);
      //console.log(results);
      assert.equal("arizona-cardinals", results[0].TeamName, 'arizona-cardinals is equal to results[0].lastName');
      assert.lengthOf(results, 32, 'There are exactly 32 teams');
   });

});

//INSERT tests
describe('INSERT user tests', () => {
   beforeEach (async () => {
      await db.dbQuery('TRUNCATE TABLE `news-punt-db-test`.user');
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Beeman', 'Boulder', 'beemanbp03', 'root', 'boulder@gmail.com', '1992-12-12', null, null, 0, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Smith', 'Mike', 'SmithM12', 'delikad', 'mikesmith@email.com', '1987-09-24', '(865)653-3423', null, 1, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Johnson', 'Claire', 'JohnsonC23', 'RosesAreRed', 'johnsonc@email.com', '1999-04-15', '(865)653-6534', null, 0, null, null);");
      //await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Mike', 'Smith', 'smithMike', 'smith33452', 'smith@email.com', '1974-03-02', '(123)456-7890', '[{'street':'124 Willow ave','unitNumber':'320','city':'Madison', 'zip':'53704','country':'United States'}]', 1, [{'teams':'['green-bay-packers']', 'players':'['Devonta Adams']}]);");
   });

   it ('Should INSERT a new user into the user table [MINIMUM VIABLE USER]', async () => {
      const queryVar = {
         LastName: "Johnson",
         FirstName: "Mark",
         Username: "BearsStillSuck",
         Password: "lombardi5434", //need to start hashing these in the tests
         Email: "johnsonmark@email.com",
         Birthdate: "1982-02-12",
         Phone: null,
         Address: null,
         PhoneEnabled: 0,
         FavoriteTeams: null,
         FavoritePlayers: null
      };
      console.log(JSON.stringify(queryVar));
      const query = "INSERT INTO `news-punt-db-test`.user (LastName, FirstName, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) " + 
      "VALUES" + 
      "('" + queryVar.LastName + "',"+
      "'" + queryVar.FirstName + "',"+
      "'" + queryVar.Username + "',"+
      "'" + queryVar.Password + "',"+
      "'" + queryVar.Email + "',"+
      "'" + queryVar.Birthdate + "',"+
      "'" + queryVar.Phone + "',"+
      "'" + queryVar.Address + "',"+
      "'" + queryVar.PhoneEnabled + "',"+
      "'" + queryVar.FavoriteTeams + "',"+
      "'" + queryVar.FavoritePlayers + "');";

      //Use an asynchonous function to return the database query results
      let results = await db.dbQuery(query, test);
      //console.log(results);
   });

   it ('Should INSERT a new user into the user table [MAXIMUM ACCEPTED USER]', async () => {
      const lastName = "Johnson";
      const firstName = "Mark";
      const username = "BearsStillSuck";
      const password = "lombardi5434";
      const email = "johnsonmark@email.com";
      const birthdate = "1982-02-12";
      const phone = "(608)485-3644";
      const address = '{"street":"23 Broadway"}';
      const phoneEnabled = 1;
      const favoriteTeams = '{"TeamName":"green-bay-packers"}';
      const favoritePlayers = null;
      const query = "INSERT INTO `news-punt-db-test`.user (LastName, FirstName, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) " + 
      "VALUES" + 
      "('" + lastName + "', '" + firstName + "', '" + username + "', '" + password + "', '" + email + "', '" + birthdate + "', '" + phone + "', " + JSON.stringify(address) + ", " + phoneEnabled + ", " + JSON.stringify(favoriteTeams) + ", " + JSON.stringify(favoritePlayers) + ")";

      //Use an asynchonous function to return the database query results
      let results = await db.dbQuery(query, test);
      //console.log(results);
   });
});

//UPDATE tests
describe('EDIT user tests', async () => {
   beforeEach (async () => {
      await db.dbQuery('TRUNCATE TABLE `news-punt-db-test`.user');
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Beeman', 'Boulder', 'beemanbp03', 'root', 'boulder@gmail.com', '1992-12-12', null, null, 0, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Smith', 'Mike', 'SmithM12', 'delikad', 'mikesmith@email.com', '1987-09-24', '(865)653-3423', null, 1, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Johnson', 'Claire', 'JohnsonC23', 'RosesAreRed', 'johnsonc@email.com', '1999-04-15', '(865)653-6534', null, 0, null, null);");
      //await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Mike', 'Smith', 'smithMike', 'smith33452', 'smith@email.com', '1974-03-02', '(123)456-7890', '[{'street':'124 Willow ave','unitNumber':'320','city':'Madison', 'zip':'53704','country':'United States'}]', 1, [{'teams':'['green-bay-packers']', 'players':'['Devonta Adams']}]);");
   });

   it ('Should edit a users first and last name', async () => {
      let idUser = 2;
      let newFirstName = 'Michael';
      let newLastName = 'Smith';

      const query = "UPDATE `news-punt-db-test`.user SET FirstName = '" + newFirstName
      + "', LastName = '" + newLastName + "' WHERE idUser = " + idUser;

      let update = await db.dbQuery(query, test);

      let selection = await db.dbQuery("SELECT * FROM `news-punt-db-test`.user WHERE idUser = 2;", test);

      //console.log(JSON.stringify(result));
      assert.equal("Michael", selection[0].FirstName);
   });

});

//DELETE tests
describe('DELETE user tests', async () => {
   beforeEach (async () => {
      await db.dbQuery('TRUNCATE TABLE `news-punt-db-test`.user');
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Beeman', 'Boulder', 'beemanbp03', 'root', 'boulder@gmail.com', '1992-12-12', null, null, 0, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Smith', 'Mike', 'SmithM12', 'delikad', 'mikesmith@email.com', '1987-09-24', '(865)653-3423', null, 1, null, null);");
      await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Johnson', 'Claire', 'JohnsonC23', 'RosesAreRed', 'johnsonc@email.com', '1999-04-15', '(865)653-6534', null, 0, null, null);");
      //await db.dbQuery("INSERT INTO `news-punt-db-test`.user (LastName, Firstname, Username, Password, Email, Birthdate, Phone, Address, PhoneEnabled, FavoriteTeams, FavoritePlayers) VALUES('Mike', 'Smith', 'smithMike', 'smith33452', 'smith@email.com', '1974-03-02', '(123)456-7890', '[{'street':'124 Willow ave','unitNumber':'320','city':'Madison', 'zip':'53704','country':'United States'}]', 1, [{'teams':'['green-bay-packers']', 'players':'['Devonta Adams']}]);");
   });

   it ('Should DELETE a user from the database', async () => {
      const idUser = 2;
      const query = "DELETE FROM `news-punt-db-test`.user WHERE idUser = " + idUser;

      let deleteResult = await db.dbQuery(query, test);
      let selectResults = await db.dbQuery('SELECT * FROM `news-punt-db-test`.user');

      //console.log(JSON.stringify(selectResults));
      assert.equal(2, selectResults.length);
   });

});

