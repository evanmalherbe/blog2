// Route to update/edit blog post. Stores new title, blog post in db
module.exports = function (app) {
  const post = require("../controllers/posts.controller.js");
  app.post("/updatepost", post.updatePost);
};
