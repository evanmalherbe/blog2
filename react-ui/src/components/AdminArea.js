import React from "react";
import { Navigate } from "react-router-dom";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import { SortAdminPage } from "./SortAdminPage";

// Import custom stylesheet
import "../App.css";

// Function to display Admin area
function AdminArea(props) {
  // Make variable names shorter
  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let dateCreated = props.dateCreatedArray;
  let dateModified = props.dateModifiedArray;
  let handleDeletePost = props.handleDeletePost;
  let selectedUser = props.selectedUser;
  let displayPosts = [];
  let toggleEditVar = props.toggleEditVar;
  let showEditPost = props.showEditPost;
  let adminStatus = props.adminStatus;
  let authMessage = props.authMessage;
  let postToDelete = props.postToDelete;

  // Create variable to display admin area or not depending on whether user is logged in and has admin
  // rights
  let showAdminArea;

  // If user has clicked on "Edit post" button, go to edit post page
  if (showEditPost === true && adminStatus === true) {
    showAdminArea = <Navigate to="/EditPost" />;

    // If user has clicked on the "Delete post" button, call DeletePost component
  } else if (
    adminStatus === true &&
    authMessage === "Success! Token valid." &&
    postToDelete === true
  ) {
    showAdminArea = <Navigate to="/DeletePost" />;

    // If user has not clicked to edit or delete a post, add all posts from array to "displayposts" variable,
    // to be displayed on page
  } else {
    // If there are posts, display them, else display "No posts" message
    if (posts.length > 0) {
      // Create arrays from db data by delimiting at commas
      let titlesArray = titles.split(",");
      let idsArray = ids.split(",");
      let authorsArray = authors.split(",");
      let dateCreatedArray = dateCreated.split(",");
      let dateModifiedArray = dateModified.split(",");

      // Posts are delimited by /// - as I was having issues with there being commas in the actual post
      // content
      let postsArray = posts.split("///,");

      // Call external function to arrange/determine how the page displays
      displayPosts = SortAdminPage(
        postsArray,
        selectedUser,
        idsArray,
        authorsArray,
        titlesArray,
        toggleEditVar,
        handleDeletePost,
        dateCreatedArray,
        dateModifiedArray
      );
    } else {
      // Display message if no posts are saved yet
      displayPosts.push(<div className="redText">No posts yet.</div>);
    }

    // Learned to redirect/Navigate with react router here:
    // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

    // if user logged in and he is an admin, show admin area
    if (authMessage === "Success! Token valid." && adminStatus === true) {
      showAdminArea = (
        <div className="adminArea" id="top">
          <h2>Admin Area</h2>
          <p>Edit or delete author's posts here.</p>
          {displayPosts}
          <br />
          <a href="#top">Back to top</a>
          <br />
        </div>
      );
    } else {
      // Else redirect to home page
      showAdminArea = <Navigate to="/" />;
    }

    // End of first if statement to show page or redirect to edit post page
  }

  return (
    <div className="bodyDiv">
      <LeftPanel
        usersArray={props.usersArray}
        updateSelectedUser={props.updateSelectedUser}
      />

      {showAdminArea}

      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default AdminArea;
