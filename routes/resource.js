// Route to authenticate user by verifying their jwt token
module.exports = function (app) {
  const jwt = require("jsonwebtoken");

  app.get("/resource", (req, res) => {
    const auth = req.headers["authorization"];
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "jwt-secret");

      // Check if user is an admin
      if (decoded.admin) {
        res.send({
          message: "Success! Token valid.",
          currentUser: `${decoded.name}`,
          adminStatus: true,
        });
      } else {
        res.send({
          message: "Success! Token valid.",
          currentUser: `${decoded.name}`,
          adminStatus: false,
        });
      }
    } catch (err) {
      res.status(401).send({ message: "Invalid token" });
    }
  });
};
