// Route to retrieve all user logins from db
module.exports = function (app) {
  const logins = require("../controllers/logins.controller.js");
  app.get("/getlogins", logins.findAll);
};
