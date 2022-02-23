import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display left panel of page. Shows buttons for each blog author, so user can select to
// only see a particular author's posts, or all author's posts
function LeftPanel(props) {
  let displayUsers = [];
  let users = props.usersArray;
  let createPostActive = props.createPostActive;

  // Populate array with button if users array has items in it
  if (users !== undefined && users.length > 0) {
    let usersArray = users.split(",");

    displayUsers.push(
      <Button
        type="button"
        variant="secondary"
        className="mb-1"
        onClick={() => props.updateSelectedUser(null)}
        key={0}
      >
        All Posts
      </Button>
    );

    // Loop to populate buttons with authors names. User clicks author's name to only see that person's
    // blog posts
    for (let i = 0; i <= usersArray.length - 1; i++) {
      // Capitalise blog author's names
      const name = usersArray[i];
      const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

      displayUsers.push(
        <Button
          type="button"
          variant="secondary"
          className="mb-1"
          // When user clicks, it updates the selected user name variable
          onClick={() => props.updateSelectedUser(usersArray[i])}
          key={i + 1}
        >
          {nameCapitalised}
        </Button>
      );
    }

    // display message if tere are no users to display
  } else {
    displayUsers.push(
      <div className="redText" key={1}>
        No posts yet.
      </div>
    );
  }

  // If the logged in user is on the "Create post" page, just display "n/a"
  if (createPostActive === true) {
    displayUsers = (
      <div className="redText" key={1}>
        N/A
      </div>
    );
  }

  // Return / display left panel
  return (
    <div className="leftPanel">
      <h4>Authors</h4>
      {displayUsers}
    </div>
  );
}

// Export component to be used in other files
export default LeftPanel;
