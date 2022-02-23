import React from "react";

// Import Link component to be used as part of React Router to display particular components based on URL
import { Link } from "react-router-dom";

// Import images
import lock from "../lockGrey.png";
import home from "../homeGrey.png";
import key from "../keyGrey.png";

// Create function to display menu links in header
function Menu(props) {
  // Declare variables
  let loginLink;
  let createPostLink;
  let adminAreaLink;
  let registerLink;
  let modifyPostsLink;

  // Only display these links in menu if there is no user logged in yet
  if (!props.loggedIn) {
    loginLink = (
      <li>
        <Link to="/Login" className="menuLink">
          <img src={lock} className="menuIcon" alt="" />
          Log in
        </Link>
      </li>
    );

    registerLink = (
      <li>
        <Link to="/Register" className="menuLink">
          <img src={key} className="menuIcon" alt="" /> Register
        </Link>
      </li>
    );
  }

  // Only display these links in menu if a user is logged in
  if (props.loggedIn) {
    createPostLink = (
      <li>
        <Link to="/CreatePost" className="menuLink">
          Create Post
        </Link>
      </li>
    );
  }

  // only display these links if user is logged in, but not an admin
  if (props.loggedIn && !props.adminStatus) {
    modifyPostsLink = (
      <li>
        <Link to="/ModifyPosts" className="menuLink">
          Modify Posts
        </Link>
      </li>
    );
  }

  // Only display this link if user is logged in and is an admin
  if (props.loggedIn && props.adminStatus) {
    adminAreaLink = (
      <li>
        <Link to="/AdminArea" className="menuLink">
          Admin Area
        </Link>
      </li>
    );
  }

  // Return / display menu of links
  return (
    <div className="menuDiv">
      <ul>
        <li>
          <Link to="/" className="menuLink">
            <img src={home} className="menuIcon" alt="" />
            Home
          </Link>
        </li>
        {loginLink}
        {registerLink}
        {createPostLink}
        {modifyPostsLink}
        {adminAreaLink}
      </ul>
    </div>
  );
}

// Export component so it can be used by Header component
export default Menu;
