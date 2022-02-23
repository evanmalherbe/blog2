import React from "react";

// Import logo image
import logo from "../blogLogo.png";

// Import component
import Menu from "./Menu";

// Import custom stylesheet
import "../App.css";

// Function to display header
function Header(props) {
  return (
    <header className="header">
      <div className="logoAndHeading">
        <img src={logo} className="logo" alt="logo" />
        <h1>Hyperion Blog</h1>
      </div>

      {/* Displays menu links */}
      <Menu loggedIn={props.loggedIn} adminStatus={props.adminStatus} />
    </header>
  );
}

// Export component to be used in other files
export default Header;
