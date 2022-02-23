// Route to add new blog post. Stores new title, blog post in db
module.exports = function (app) {
  const post = require("../controllers/posts.controller.js");
  app.post("/deletepost", post.deletePost);
};
