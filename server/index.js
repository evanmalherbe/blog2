// Require modules
const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3001;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  /* Use Helmet middleware to improve security

  All the custom Content security policy settings were necessary because the Google and Facebook login buttons were causing so many errors. The following sites were helpful in figuring out which settings 
  to change: 

  https://stackoverflow.com/questions/70752770/helmet-express-err-blocked-by-response-notsameorigin-200

  https://helmetjs.github.io/

  https://github.com/anthonyjgrove/react-google-login/issues/132

  https://stackoverflow.com/questions/18447970/
  content-security-policy-data-not-working-for-base64-images-in-chrome-28/18449556#18449556

  https://drupal.stackexchange.com/questions/302192/
  how-do-i-configure-content-security-policy-for-base64-images

  https://csp-evaluator.withgoogle.com/
  
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors

  */
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          "script-src-elem": [
            "'self'",
            "https://connect.facebook.net",
            "https://www.facebook.com",
            "https://apis.google.com",
          ],
          "frame-src": ["'self'", "https://accounts.google.com"],
          "connect-src": [
            "'self'",
            "https://www.facebook.com",
            "https://web.facebook.com",
            "https://z-p3-graph.facebook.com",
            "https://graph.facebook.com",
          ],
          "img-src": ["'self'", "data:", "https://web.facebook.com"],
          "frame-ancestors": ["'self'", "https://www.facebook.com"],
        },
      },
    })
  );

  // Use bodyparser to send data in body of http request
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Set path to .env file
  dotenv.config({ path: ".env" });

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  //Import routes
  require("../routes/api")(app);
  require("../routes/getposts")(app);
  require("../routes/getlogins")(app);
  require("../routes/login")(app);
  require("../routes/register")(app);
  require("../routes/resource")(app);
  require("../routes/addpost")(app);
  require("../routes/deletepost")(app);
  require("../routes/updatepost")(app);

  // Auth details for connecting to db
  const username = "evanmalherbe";

  /* Get password from .env file. Needed to consult the following website to get it to work: 
    https://stackoverflow.com/questions/65896414/how-can-i-use-environmental-variable-for-database-password-in-nodejs */
  const password = process.env.PASSWORD;
  const cluster = "cluster0.xrjxb";
  const dbname = "blog";

  mongoose.Promise = global.Promise;

  /* This website was very useful in getting the connection and error handling commands right:
https://mongoosejs.com/docs/connections.html */

  // Initial connection to db and error handling if initial connection fails
  mongoose
    .connect(
      process.env.MONGODB_URI ||
        `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
    )
    .catch((error) =>
      console.log("Failed initial connection to db. Error is: " + error)
    );

  // Message if success in connecting to db
  mongoose.connection.once("open", function () {
    console.log("Successfully connected to the database");
  });

  // Error handling if connection to db fails after an initially successful connection
  mongoose.connection.on("error", (error) => {
    if (error) {
      console.log("An error occurred after initial connection to db: " + error);
    } else {
      console.log("Connection Established");
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
