// Route to api
module.exports = function (app) {
  // Answer API requests.
  app.get("/api", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send("Hello from Evans server!");
  });
};
