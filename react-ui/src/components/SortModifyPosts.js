import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Function to determine how to display "modify posts" page
export function SortModifyPosts(
  postsArray,
  currentUser,
  idsArray,
  authorsArray,
  titlesArray,
  toggleEditVar,
  handleDeletePost,
  dateCreatedArray,
  dateModifiedArray
) {
  let displayPosts = [];

  // Loop through posts and create divs for each post with buttons to delete and edit
  for (let i = 0; i <= postsArray.length - 1; i++) {
    // Capitalise author names
    const name = authorsArray[i];
    const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

    // Only display blog posts created by currently logged in author, along with edit and delete buttons
    if (authorsArray[i] === currentUser) {
      displayPosts.push(
        <div className="post" key={idsArray[i]}>
          <div className="author">
            <b>Author:</b> {nameCapitalised}
          </div>
          <div className="title">{titlesArray[i]}</div>

          {/* Learned to replace character in string here:
        https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
          <div className="postBody">{postsArray[i].replace("///", "")}</div>
          <div className="postButtons">
            <Button
              className="buttons"
              variant="primary"
              type="button"
              onClick={() =>
                toggleEditVar(
                  idsArray[i],
                  authorsArray[i],
                  titlesArray[i],
                  postsArray[i]
                )
              }
            >
              Edit Post
            </Button>
            <Button
              className="buttons"
              variant="primary"
              type="button"
              onClick={() => handleDeletePost(idsArray[i])}
            >
              Delete Post
            </Button>
          </div>
          <div className="bothTimeStamps">
            <div className="dateCreated">
              {" "}
              <b>Date Created:</b> &nbsp;{dateCreatedArray[i]}
            </div>
            <div className="dateModified">
              <b>Date Modified:</b>&nbsp;
              {dateModifiedArray[i]}
            </div>
          </div>
        </div>
      );
    }
  }

  // Display message if no posts have been created by the logged in author yet
  if (displayPosts.length === 0) {
    displayPosts.push(
      <div className="redText" key={1}>
        No posts yet.
      </div>
    );
  }

  // Return array of divs for each post to be used by "Modify posts" component
  return displayPosts;
}
