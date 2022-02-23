import React from "react";

// Import sortposts function/component
import { SortPosts } from "./SortPosts";

// Import custom stylesheet
import "../App.css";

// Function to display Centre Panel
function CentrePanel(props) {
  let titles = props.titlesArray;
  let posts = props.postsArray;
  let ids = props.idArray;
  let authors = props.authorArray;
  let selectedUser = props.selectedUser;
  let dateCreated = props.dateCreatedArray;
  let dateModified = props.dateModifiedArray;

  // Use imported function to sort/determine the way posts will be displayed
  let displayPosts = SortPosts(
    titles,
    posts,
    ids,
    authors,
    selectedUser,
    dateCreated,
    dateModified
  );

  // Variable to let user know whose posts are currently being displayed on the page
  let whosePosts;

  // If user has not clicked on the button to view a specific blog author's posts, show them all, else show the specific author's posts only
  if (selectedUser === null) {
    whosePosts = "All posts";
  } else {
    const name = selectedUser;
    const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);
    whosePosts = `${nameCapitalised}'s posts`;
  }

  // Return/display page
  return (
    <div className="centerPanel" id="top">
      <h2>{whosePosts}</h2>
      {displayPosts}
      <a href="#top">Back to top</a>
    </div>
  );
}

// Export component to be used in other files
export default CentrePanel;
