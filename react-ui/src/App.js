import React from "react";

// Import components
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import RegisterForm from "./components/RegisterForm";
import RegisterUser from "./components/RegisterUser";
import CreatePostForm from "./components/CreatePostForm";
import AddPost from "./components/AddPost";
import DeletePost from "./components/DeletePost";
import UpdatePost from "./components/UpdatePost";
import AdminArea from "./components/AdminArea";
import GetPosts from "./components/GetPosts";
import EditPostForm from "./components/EditPostForm";
import CreateWelcome from "./components/CreateWelcome";
import ScrollToTop from "./components/ScrollToTop";
import ModifyPosts from "./components/ModifyPosts";

// Import Components for React-Router (to display certain components based on the URL the user chooses)
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "./App.css";

// Create App class component
class App extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: false,
      message: null,
      authMessage: null,
      error: null,
      username: null,
      password: null,
      hashedPassword: null,
      loggedIn: false,
      token: null,
      currentUser: null,
      adminStatus: null,
      titlesArray: [],
      postsArray: [],
      idArray: [],
      authorArray: [],
      postId: null,
      postAuthor: null,
      postTitle: null,
      postBody: null,
      usersArray: [],
      pwordArray: [],
      adminStatusArray: [],
      editPostSubmitted: false,
      admin: null,
      selectedUser: null,
      dateCreatedArray: [],
      dateModifiedArray: [],
      dateModified: null,
      showEditPost: false,
      justRegistered: false,
      userToRegister: false,
      editCanceled: false,
      postToAdd: false,
      postToDelete: false,
      postToUpdate: false,
      loggedInWithGoogle: false,
      loggedInWithFacebook: false,
      breadcrumbs: "Home",
    };

    // Binding to make "this" work correctly
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.getLogins = this.getLogins.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.updateSelectedUser = this.updateSelectedUser.bind(this);
    this.toggleEditVar = this.toggleEditVar.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.reloadForAddPost = this.reloadForAddPost.bind(this);
    this.reloadForDeletePost = this.reloadForDeletePost.bind(this);
    this.reloadForUpdatePost = this.reloadForUpdatePost.bind(this);
    this.reloadForRegisterUser = this.reloadForRegisterUser.bind(this);
    this.handleClearPost = this.handleClearPost.bind(this);
    this.changeBreadcrumb = this.changeBreadcrumb.bind(this);
  }

  // This function is called by RegisterUSer component to reload page after adding user to db
  reloadForRegisterUser() {
    this.setState(
      {
        isLoaded: false,
        userToRegister: false,
        justRegistered: true,
      },
      () => {
        console.log("Reload for register user has run.");
        this.reloadPage();
      }
    );
  }

  // This function is called by UpdatePost component to reload page after updating a post
  reloadForUpdatePost() {
    this.setState(
      {
        isLoaded: false,
        postToUpdate: false,
        showEditPost: false,
      },
      () => {
        console.log("Reload for update post has run.");
        this.reloadPage();
      }
    );
  }

  // This function is called by DeletePost component to reload page after deleting a post
  reloadForDeletePost() {
    this.setState(
      {
        isLoaded: false,
        postToDelete: false,
      },
      () => {
        console.log("Reload for delete post has run.");
        this.reloadPage();
      }
    );
  }

  // This function is called by AddPost component to reload page after adding new post
  reloadForAddPost() {
    this.setState(
      {
        isLoaded: false,
        postToAdd: false,
      },
      () => {
        console.log("Reload for add post has run.");
        alert("Your blog post has been saved successfully.");
        this.reloadPage();
      }
    );
  }

  // Runs when user clicks the cancel button on the edit post page. Returns to Admin area.
  handleCancelEdit() {
    this.setState({
      showEditPost: false,
      editCanceled: true,
      postId: null,
      postAuthor: null,
      postTitle: null,
      postBody: null,
    });
  }

  // Handles logging in with Facebook account when user clicks button on login page
  handleFacebookLogin(user, loginStatus, userID) {
    this.setState(
      {
        currentUser: user,
        username: user,
        password: userID,
        loggedIn: loginStatus,
        authMessage: "Success! Token valid.",
        adminStatus: false,
        loggedInWithFacebook: true,
      },
      () => {
        console.log("Facebook login status is: " + this.state.loggedIn);
        this.handleRegister();
      }
    );
  }

  // Handles logging in with Google account when user clicks button on login page
  handleGoogleLogin(loginStatus, gUsername, googleId) {
    this.setState(
      {
        currentUser: gUsername,
        username: gUsername,
        password: googleId,
        loggedIn: loginStatus,
        authMessage: "Success! Token valid.",
        adminStatus: false,
        loggedInWithGoogle: true,
      },
      () => {
        console.log("Google Login status is: " + this.state.loggedIn);
        this.handleRegister();
      }
    );
  }

  /* Toggles a variable to either show the edit post form or not, depending on whether the user
   clicked the "Edit post" button */
  toggleEditVar(id, author, title, post) {
    this.setState(
      {
        showEditPost: true,
        postId: id,
        postAuthor: author,
        postTitle: title,
        postBody: post,
      },
      () =>
        console.log(
          "Show edit post is set to: " +
            this.state.showEditPost +
            ", and post author is: " +
            this.state.postAuthor
        )
    );
  }

  /* Runs when user clicks on a particular blog author's name in the left panel to display only that author's posts */
  updateSelectedUser(user) {
    this.setState({ selectedUser: user }, () =>
      console.log("Selected user is now: " + this.state.selectedUser)
    );
  }

  // Runs when user has edited/updated their blog post on the Admin area page and hits the Update button
  // Saves updated title and post to database
  handleEditPost(id) {
    // Add "///" to end of post to help separate posts later (commas in post body where making it difficult
    // to separate posts into an array, so this is what I came up with)
    let cleanedPost = this.state.postBody.replace("///", "");
    let finalPost = cleanedPost + "///";

    // Learned how to add a time stamp here:
    // https://stackoverflow.com/questions/9756120/how-do-i-get-a-utc-timestamp-in-javascript

    let dateMod = new Date().toString();

    // Learned how to remove words from a string here:
    // https://stackoverflow.com/questions/10398931/how-to-remove-text-from-a-string

    dateMod = dateMod.replace(" (South Africa Standard Time)", "");

    this.setState(
      {
        postToUpdate: true,
        postId: id,
        postBody: finalPost,
        dateModified: dateMod,
      },
      () =>
        console.log(
          "Handle edit post has run and post to update variable is: " +
            this.state.postToUpdate
        )
    );

    // End of handle edit post function
  }

  // Runs when user clicks delete button for a post on the Admin area page. Removes post from db
  handleDeletePost(id) {
    // Learned how to use window.confirm here:
    // https://stackoverflow.com/questions/63311845/unexpected-use-of-confirm-no-restricted-globals

    // If user confirms they want to delete blog post, this function sets "postToDelete" to true, which
    // lets the "DeletePost" component load. This deletes the post from the db.
    if (
      window.confirm("Are you sure you want to delete this blog post?") === true
    ) {
      this.setState({
        postToDelete: true,
        postId: id,
      });

      // if user clicks cancel on confirmation message, goes back to AdminArea page
    } else {
      this.setState({
        postToDelete: false,
      });
    }

    // End of handle delete post function
  }

  // Functions to save post title and blog post to state when user types them into "create post" form
  handleTitle(event) {
    let value = event.target.value;
    let title = value.trim();
    this.setState(
      {
        postTitle: title,
      },
      () => {
        console.log("Post title saved: " + this.state.postTitle);
      }
    );
  }

  handlePost(event) {
    let value = event.target.value;
    let post = value.trim();
    this.setState(
      {
        postBody: post,
      },
      () => {
        console.log("Post body saved to state.");
      }
    );
  }

  // ----------------------------------------------------------- //

  // Clear create post form fields
  handleClearPost() {
    this.setState(
      {
        postTitle: null,
        postBody: null,
      },
      () => {
        console.log("Form fields cleared.");
        document.forms["createPostForm"].reset();
      }
    );
  }

  // Saves new blog post to database, along with date created timestamp
  handleSavePost() {
    if (this.state.postTitle !== null || this.state.postBody !== null) {
      // Add "///" to end of post to help separate posts later (commas in post body where making it difficult to separate posts into an array, so this is what I came up with)
      let cleanedPost = this.state.postBody.replace("///", "");
      let finalPost = cleanedPost + "///";

      // Learned how to add a time stamp here:
      // https://stackoverflow.com/questions/9756120/how-do-i-get-a-utc-timestamp-in-javascript

      let date = new Date().toString();

      // Learned how to remove words from a string here:
      // https://stackoverflow.com/questions/10398931/how-to-remove-text-from-a-string

      date = date.replace(" (South Africa Standard Time)", "");

      // Setting variable "postToAdd" to true loads the AddPost component and adds post to db
      this.setState({
        dateCreated: date,
        postBody: finalPost,
        postToAdd: true,
      });
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Post title or post body field is blank.");
          alert(
            "Post title or post body field is blank. Please fill in, then click the 'Save Post' button."
          );
          this.reloadPage();
        }
      );
      // End of if statement to check that username and password fields are not empty
    }
  }

  // Take user login details and create JWT token, then call "handleAuth" function to authenticate user
  handleLogin() {
    // Run if username and password fields are not blank in form
    if (this.state.username !== null && this.state.password !== null) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          users: this.state.usersArray,
          pwords: this.state.pwordArray,
          admin: this.state.adminStatusArray,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                token: result.message,
              },
              () => {
                console.log(
                  "Handle login has run. Login details sent via post. Token is " +
                    this.state.token
                );

                // Call handle auth function to authenticate user
                this.handleAuth(this.state.token);
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );

      // Else create alert if form fields are blank
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your username and password, then click 'Login' again."
          );
          this.reloadPage();
        }
      );
      // End of if statement to check that username and password fields are not empty
    }

    // End of handlelogin function
  }

  /* Takes token created in "handleLogin" function and authenticates user */
  handleAuth(token) {
    if (token !== undefined && token !== "Incorrect login!" && token !== null) {
      fetch("/resource", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: false,
                loggedIn: true,
                currentUser: result.currentUser,
                authMessage: result.message,
                adminStatus: result.adminStatus,
                username: null,
                password: null,
              },
              () => {
                console.log(
                  "HandleAuth function has run. Welcome, " +
                    this.state.currentUser +
                    "! Admin status is: " +
                    this.state.adminStatus +
                    ". Auth message says: " +
                    this.state.authMessage
                );
                this.reloadPage();
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {
      // Runs if user fills in invalid login details or leaves one of the fields blank

      /* Learned to clear/reset form here:
      https://stackoverflow.com/questions/3786694/how-to-reset-clear-form-through-javascript */

      document.forms["loginForm"].reset();
      alert("Incorrect login details. Please try again.");
      console.log("Invalid token. Not logged in.");

      this.reloadPage();
    }
    // End of handleauth function
  }

  // Sets variables to default null state when user clicks the logout button
  handleLogout() {
    this.setState(
      {
        loggedIn: false,
        authMessage: null,
        message: null,
        token: null,
        username: null,
        password: null,
        currentUser: null,
        adminStatus: null,
        selectedUser: null,
        showEditPost: false,
        showGoogleRegButton: false,
        showGoogleLogin: false,
        justRegistered: false,
        loggedInWithGoogle: false,
        loggedInWithFacebook: false,
        userToRegister: false,
        postToUpdate: false,
        postToAdd: false,
        postToDelete: false,
      },
      () => {
        console.log("User has been logged out.");
      }
    );
  }

  /* Register new user. Saves their login details to db and lets them create their own blog posts */
  handleRegister() {
    // Runs if username and password field are not blank
    if (this.state.username !== null || this.state.password !== null) {
      let matchUserAndPass = false;
      let matchUsername = false;
      let users = [];
      let pwords = [];

      users = this.state.usersArray.split(",");
      pwords = this.state.pwordArray.split(",");

      // Check to see if user already exists on database (matching username AND password)
      for (let i = 0; i <= users.length - 1; i++) {
        if (
          users[i] === this.state.username &&
          pwords[i] === this.state.password
        ) {
          matchUserAndPass = true;
        }
      }

      // Check to see if username already exists on database (matching username only)
      for (let i = 0; i <= users.length - 1; i++) {
        if (users[i] === this.state.username) {
          matchUsername = true;
        }
      }

      // Create console log msg to tell about matching username or username and password
      if (matchUserAndPass === true) {
        console.log("Matching username and password in database.");
      } else if (matchUsername === true) {
        console.log("Matching username in database.");
      }

      // If user does not yet exist on db, register them.
      if (matchUsername === false) {
        this.setState(
          {
            isLoaded: false,
            userToRegister: true,
          },
          () => {
            console.log("handle register - 'user to register' set to true");
            this.reloadPage();
          }
        );

        // If user is already registered in db with Google, just log in
      } else if (
        matchUserAndPass === true &&
        this.state.loggedInWithGoogle === true
      ) {
        this.setState(
          {
            isLoaded: false,
            userToRegister: false,
          },
          () => {
            console.log("User already has login saved in db (Google).");
            this.reloadPage();
          }
        );

        // If user is already registered in db with Facebook, just log in
      } else if (
        matchUserAndPass === true &&
        this.state.loggedInWithFacebook === true
      ) {
        this.setState(
          {
            isLoaded: false,
            userToRegister: false,
          },
          () => {
            console.log("User already has login saved in db (Facebook).");
            this.reloadPage();
          }
        );

        // if username already exists, create alert message
      } else if (matchUsername === true) {
        this.setState(
          {
            isLoaded: false,
            userToRegister: false,
            loggedIn: false,
            authMessage: null,
            loggedInWithFacebook: false,
            loggedInWithGoogle: false,
          },
          () => {
            console.log("Username already exists. Not logging in.");
            alert(
              "A user with that username already exists. Please choose a different username and then try again."
            );
            this.reloadPage();
          }
        );
      }
    } else {
      // Runs if user submits form with blank username or password field
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your new username and password, then click 'Register' again."
          );
          this.reloadPage();
        }
      );

      // End of if statement to check that state variables "username" and "password" are not null
    }

    // End of handleregister function
  }

  // Functions to save username and password to state when user types them in to login form
  handleUsername(event) {
    let value = event.target.value;
    let user = value.trim();
    this.setState({
      username: user,
    });
  }

  handlePassword(event) {
    let value = event.target.value;
    let pwd = value.trim();
    this.setState({
      password: pwd,
    });
  }

  // --------------------------------------------------------- //

  // Retrieve blog posts from db - This function is called from child component "GetPosts.js"
  loadPosts(
    getIsLoaded,
    getTitlesArray,
    getPostsArray,
    getIdArray,
    getAuthorArray,
    getDateCreatedArray,
    getDateModifiedArray
  ) {
    this.setState({
      isLoaded: getIsLoaded,
      titlesArray: getTitlesArray,
      postsArray: getPostsArray,
      idArray: getIdArray,
      authorArray: getAuthorArray,
      dateCreatedArray: getDateCreatedArray,
      dateModifiedArray: getDateModifiedArray,
    });

    // End of load Posts
  }

  // Retrieve logins from db
  reloadPage() {
    if (this.state.isLoaded === false) {
      this.getLogins();
      console.log("Reload page has run.");

      // End of if statement to check if data has been loaded yet.
    }

    //End of reload page
  }

  // Retrieve user login details from database
  getLogins() {
    fetch("/getlogins")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: true,
              usersArray: result.users,
              pwordArray: result.pwords,
              adminStatusArray: result.admin,
              message: result.message,
            },
            () => {
              console.log("Db says: " + this.state.message);
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  changeBreadcrumb(currentPage) {
    let currentBreadcrumb = <div className="breadcrumbs">{currentPage}</div>;
    this.setState({
      breadcrumbs: currentBreadcrumb,
    });
  }

  // Runs when page is first loaded. Retrieves logins from db
  componentDidMount() {
    if (this.state.isLoaded === false) {
      this.getLogins();

      console.log("componentDidMount has run.");
      // End of if statement to check if data has been loaded yet.
    }

    //End of component did mount
  }

  render() {
    // Shorten variable names
    const {
      error,
      isLoaded,
      message,
      currentUser,
      loggedIn,
      titlesArray,
      postsArray,
      idArray,
      usersArray,
      authorArray,
      dateCreatedArray,
      dateModifiedArray,
      dateModified,
      adminStatus,
      authMessage,
      postId,
      postAuthor,
      postTitle,
      postBody,
      dateCreated,
      selectedUser,
      showEditPost,
      justRegistered,
      editCanceled,
      postToAdd,
      postToDelete,
      postToUpdate,
      userToRegister,
      username,
      password,
      loggedInWithGoogle,
      loggedInWithFacebook,
      count,
      breadcrumbs,
    } = this.state;

    let loginStatusMsg;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // Calls CreateWelcome component to create appropriate login status message
      loginStatusMsg = CreateWelcome(
        loggedIn,
        adminStatus,
        currentUser,
        this.handleLogout
      );

      return (
        <div className="app">
          <BrowserRouter>
            {/* Component to automatically scroll to top of new page when user arrives */}
            <ScrollToTop />

            {/* Retrieve blog posts from db */}
            <GetPosts
              isLoaded={this.state.isLoaded}
              loadPosts={this.loadPosts}
            />

            <Header loggedIn={loggedIn} adminStatus={adminStatus} />
            <div className="underHeader">
              {breadcrumbs}
              {/* Display login status message. Contents differ according to whether user is logged in or 
              not */}
              {loginStatusMsg}
            </div>
            <Routes>
              <Route
                exact={true}
                path="/"
                element={
                  <Home
                    updateSelectedUser={this.updateSelectedUser}
                    selectedUser={selectedUser}
                    titlesArray={titlesArray}
                    idArray={idArray}
                    postsArray={postsArray}
                    authorArray={authorArray}
                    message={message}
                    usersArray={usersArray}
                    dateCreatedArray={dateCreatedArray}
                    dateModifiedArray={dateModifiedArray}
                    changeBreadcrumb={this.changeBreadcrumb}
                    count={count}
                  />
                }
              />

              <Route
                path="/Login"
                element={
                  <LoginForm
                    userToRegister={userToRegister}
                    authMessage={authMessage}
                    handleLogin={this.handleLogin}
                    handleUsername={this.handleUsername}
                    handlePassword={this.handlePassword}
                    handleGoogleLogin={this.handleGoogleLogin}
                    handleFacebookLogin={this.handleFacebookLogin}
                    changeBreadcrumb={this.changeBreadcrumb}
                    count={count}
                  />
                }
              />

              <Route
                path="/Register"
                element={
                  <RegisterForm
                    handleUsername={this.handleUsername}
                    handlePassword={this.handlePassword}
                    handleRegister={this.handleRegister}
                    handleGoogleRegister={this.handleGoogleRegister}
                    handleFacebookRegister={this.handleFacebookRegister}
                    justRegistered={justRegistered}
                    userToRegister={userToRegister}
                    changeBreadcrumb={this.changeBreadcrumb}
                    count={count}
                  />
                }
              />

              <Route
                path="/RegisterUser"
                element={
                  <RegisterUser
                    userToRegister={userToRegister}
                    justRegistered={justRegistered}
                    username={username}
                    password={password}
                    reloadForRegisterUser={this.reloadForRegisterUser}
                    loggedInWithGoogle={loggedInWithGoogle}
                    loggedInWithFacebook={loggedInWithFacebook}
                  />
                }
              />

              <Route
                path="/CreatePost"
                element={
                  <CreatePostForm
                    authMessage={authMessage}
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleSavePost={this.handleSavePost}
                    createPostActive={true}
                    postToAdd={postToAdd}
                    userToRegister={userToRegister}
                    handleClearPost={this.handleClearPost}
                    changeBreadcrumb={this.changeBreadcrumb}
                    count={count}
                  />
                }
              />

              <Route
                path="/AddPost"
                element={
                  <AddPost
                    adminStatus={adminStatus}
                    author={this.state.currentUser}
                    title={this.state.postTitle}
                    post={postBody}
                    datecreated={dateCreated}
                    reloadForAddPost={this.reloadForAddPost}
                    postToAdd={postToAdd}
                  />
                }
              />

              <Route
                path="/DeletePost"
                element={
                  <DeletePost
                    adminStatus={adminStatus}
                    postId={postId}
                    postToDelete={postToDelete}
                    reloadForDeletePost={this.reloadForDeletePost}
                  />
                }
              />

              <Route
                path="/ModifyPosts"
                element={
                  <ModifyPosts
                    currentUser={currentUser}
                    authMessage={authMessage}
                    titlesArray={titlesArray}
                    idArray={idArray}
                    postsArray={postsArray}
                    authorArray={authorArray}
                    dateCreatedArray={dateCreatedArray}
                    dateModifiedArray={dateModifiedArray}
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleEditPost={this.handleEditPost}
                    handleDeletePost={this.handleDeletePost}
                    toggleEditVar={this.toggleEditVar}
                    showEditPost={showEditPost}
                    postToDelete={postToDelete}
                    changeBreadcrumb={this.changeBreadcrumb}
                    count={count}
                  />
                }
              />

              <Route
                path="/EditPost"
                element={
                  <EditPostForm
                    authMsg={authMessage}
                    adminStatus={adminStatus}
                    id={postId}
                    title={postTitle}
                    post={postBody}
                    author={postAuthor}
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleEditPost={this.handleEditPost}
                    handleCancelEdit={this.handleCancelEdit}
                    showEditPost={showEditPost}
                    editCanceled={editCanceled}
                    postToUpdate={postToUpdate}
                    changeBreadcrumb={this.changeBreadcrumb}
                    count={count}
                  />
                }
              />

              <Route
                path="/UpdatePost"
                element={
                  <UpdatePost
                    adminStatus={adminStatus}
                    postToUpdate={postToUpdate}
                    postId={postId}
                    postTitle={postTitle}
                    postBody={postBody}
                    dateModified={dateModified}
                    reloadForUpdatePost={this.reloadForUpdatePost}
                  />
                }
              />

              <Route
                path="/AdminArea"
                element={
                  <AdminArea
                    updateSelectedUser={this.updateSelectedUser}
                    usersArray={usersArray}
                    selectedUser={selectedUser}
                    authMessage={authMessage}
                    adminStatus={adminStatus}
                    titlesArray={titlesArray}
                    idArray={idArray}
                    postsArray={postsArray}
                    authorArray={authorArray}
                    dateCreatedArray={dateCreatedArray}
                    dateModifiedArray={dateModifiedArray}
                    handleTitle={this.handleTitle}
                    handlePost={this.handlePost}
                    handleEditPost={this.handleEditPost}
                    handleDeletePost={this.handleDeletePost}
                    toggleEditVar={this.toggleEditVar}
                    showEditPost={showEditPost}
                    postToDelete={postToDelete}
                    postToUpdate={postToUpdate}
                    changeBreadcrumb={this.changeBreadcrumb}
                    count={count}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
          <Footer />
          {/* End of App div */}
        </div>
      );
      // End of if statement
    }

    // End of render
  }

  // End of App class component
}

// Export app to be used by other files
export default App;
