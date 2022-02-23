// Import logins model file
const Login = require("../models/logins.model.js");

// Add new user to collection
exports.create = function (req, res) {
  let loginModel = new Login({
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
  });

  // Save new login to collection
  loginModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while adding login info." });
    } else {
      console.log(data);
      res.send({ message: "Login info has been added" });
    }
  });
};

// Retrieve all logins from db
exports.findAll = function (req, res) {
  Login.find({}, function (err, logins) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving logins." });
    } else {
      // Push results to 3 arrays, one for usernames, another for passwords and a 3rd for admin status 
      //(true or false)
      let usernames = [];
      let passwords = [];
      let adminStatus = [];
      let msg = "Logins retrieved successfully.";

      /* Learned to create array from mongoDB output here: 
      https://stackoverflow.com/questions/38997210/create-array-of-items-from-mongodb-node-js */

      logins.forEach(function (result) {
        usernames.push(result.username);
      });

      logins.forEach(function (result) {
        passwords.push(result.password);
      });

      logins.forEach(function (result) {
        adminStatus.push(result.admin);
      });

      // Send login arrays to frontend
      res.json({
        users: `${usernames}`,
        pwords: `${passwords}`,
        admin: `${adminStatus}`,
        message: `${msg}`,
      });
    }
  });
};
