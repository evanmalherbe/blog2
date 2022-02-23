import React from "react";

// Function to determine how to display posts on home page
export function SortPosts(
  titles,
  posts,
  ids,
  authors,
  selectedUser,
  dateCreated,
  dateModified
) {
  let i;
  let displayPosts = [];

  // As long as there are more than zero posts and the array is not undefined, continue
  if (posts !== undefined && posts.length > 0) {
    // Split arrays by comma
    let titlesArray = titles.split(",");
    let authorsArray = authors.split(",");
    let idsArray = ids.split(",");
    let dateCreatedArray = dateCreated.split(",");
    let dateModifiedArray = dateModified.split(",");

    // Split posts by ///, not commas, since there are often commas in the text of blog post
    let postsArray = posts.split("///,");

    // Loop to populate array with divs for each post
    for (i = 0; i <= postsArray.length - 1; i++) {
      // Capitalise author names
      const name = authorsArray[i];
      const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

      // If user has not yet clicked to only view a particular blog author's posts, display all blogs
      if (selectedUser === null) {
        displayPosts.push(
          <div className="post" key={idsArray[i]}>
            <div className="author">
              <b>Author:</b> {nameCapitalised}
            </div>
            <div className="title">{titlesArray[i]}</div>

            {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
            <div className="postBody">{postsArray[i].replace("///", "")}</div>
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

        // If user has clicked button to only view particular author's posts, just show those posts
      } else if (authorsArray[i] === selectedUser) {
        displayPosts.push(
          <div className="post" key={idsArray[i]}>
            <div className="author">
              <b>Author:</b> {nameCapitalised}
            </div>
            <div className="title">{titlesArray[i]}</div>

            {/* Learned to replace character in string here:
          https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/ */}
            <div className="postBody">{postsArray[i].replace("///", "")}</div>
            <div className="bothTimeStamps">
              <div className="dateCreated">
                {" "}
                <b>Date Created:</b>&nbsp; {dateCreatedArray[i]}
              </div>
              <div className="dateModified">
                <b>Date Modified:</b> &nbsp;{dateModifiedArray[i]}
              </div>
            </div>
          </div>
        );
      }
    }

    // Display message if there are no posts for the currently selected blog author
    if (displayPosts.length === 0) {
      displayPosts.push(
        <div className="redText" key={1}>
          No posts yet.
        </div>
      );
    }

    // Display message if there are no posts to display at all.
  } else {
    displayPosts.push(
      <div className="redText" key={1}>
        No posts yet.
      </div>
    );
  }

  // Return divs for each post to be used by Centre Panel component
  return displayPosts;
}
