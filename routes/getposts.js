// Route to get blog posts from db
module.exports = function (app) {
  const post = require("../controllers/posts.controller.js");
  app.get("/getposts", post.findAll);
};
