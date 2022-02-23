/* Route to create jwt token for user to log in. Checks to see if login details that user typed in match with any stored in db then creates token if they do, else sends error message */
module.exports = function (app) {
  const jwt = require("jsonwebtoken");

  app.post("/login", (req, res) => {
    // Declare variables from req.body
    const usr = req.body.username;
    const pwd = req.body.password;
    const users = req.body.users;
    const pwords = req.body.pwords;
    const admin = req.body.admin;

    // Split arrays by comma
    let usersArray = users.split(",");
    let pwordsArray = pwords.split(",");
    let adminArray = admin.split(",");

    // For loop to check if user login details match with any logins already stored in db
    for (let i = 0; i <= usersArray.length - 1; i++) {
      if (usr === usersArray[i] && pwd === pwordsArray[i]) {
        if (adminArray[i] === "true") {
          payload = {
            name: usr,
            admin: true,
          };
        } else {
          payload = {
            name: usr,
            admin: false,
          };
        }

        const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
          algorithm: "HS256",
        });

        return res.send({ message: token, data: "Login page responded." });
      }
    }

    // If none of the stored logins match what the user enters, say "incorrect login".
    res.status(403).send({ message: "Incorrect login!" });
  });
};
