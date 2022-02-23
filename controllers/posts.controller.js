/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */

// Import posts model file
const Post = require("../models/posts.model.js");

// Add new post to collection
exports.create = function (req, res) {
  let postModel = new Post({
    author: req.body.author,
    title: req.body.title,
    post: req.body.post,
    datecreated: req.body.datecreated,
  });

  // Save new blog post to collection
  postModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while adding blog post." });
    } else {
      console.log(data);
      res.send({ message: "The blog post has been added" });
    }
  });
};

// Retrieve all blog posts from db
exports.findAll = function (req, res) {
  Post.find({}, function (err, post) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving blog posts." });
    } else {
      // Process result by pushing items to an array - separate arrays for blog titles, blog posts, blog authors, post id's, date created and date modified
      let titlesArray = [];
      let postsArray = [];
      let postIdArray = [];
      let postAuthorArray = [];
      let dateCreatedArray = [];
      let dateModifiedArray = [];
      let message = "Blog posts retrieved successfully.";

      /* Learned to create array from mongoDB output here: 
      https://stackoverflow.com/questions/38997210/create-array-of-items-from-mongodb-node-js */

      post.forEach(function (result) {
        titlesArray.push(result.title);
      });

      post.forEach(function (result) {
        postsArray.push(result.post);
      });

      post.forEach(function (result) {
        postAuthorArray.push(result.author);
      });

      post.forEach(function (result) {
        postIdArray.push(result._id);
      });

      // if statement to check if there is a date created or date modified document, since they are not
      //required as per the model
      post.forEach(function (result) {
        if (result.datecreated === null || result.datecreated === undefined) {
          dateCreatedArray.push("");
        } else {
          dateCreatedArray.push(result.datecreated);
        }
      });

      post.forEach(function (result) {
        if (result.datemodified === null || result.datemodified === undefined) {
          dateModifiedArray.push("n/a");
        } else {
          dateModifiedArray.push(result.datemodified);
        }
      });

      // Send data to front end
      res.json({
        message: `${message}`,
        titles: `${titlesArray}`,
        posts: `${postsArray}`,
        ids: `${postIdArray}`,
        authors: `${postAuthorArray}`,
        datecreated: `${dateCreatedArray}`,
        datemodified: `${dateModifiedArray}`,
      });

      // End of if statement
    }
  });

  // End of findall function
};

// Update/edit post
exports.updatePost = function (req, res) {
  // Id of blog post to update
  let query = { _id: req.body.id };

  // Update post with new info
  Post.findOneAndUpdate(
    query,
    // Fields to update from form input
    {
      title: req.body.title,
      post: req.body.post,
      // Add date modified
      datemodified: req.body.dateMod,
    },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating post!");
        res.send({ message: "ERROR: Post Not Updated - " + err });
      }
      res.send({ message: "Blog post updated!" });
    }
  );
};

// Delete list item (uses id to delete only one specific item)
exports.deletePost = function (req, res) {
  Post.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) {
      console.log("ERROR: Post NOT removed. " + err);
      res.send({ message: "ERROR: Post NOT removed. " + err });
    }
    res.send({ message: "Blog post removed." });
  });
};
