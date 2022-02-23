import React from "react";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";

// Import custom stylesheet
import "../App.css";

// Function to create welcome message for logged in user
function CreateWelcome(loggedIn, adminStatus, currentUser, handleLogout) {
  // Create welcome message if user logged in, else say no user is currently logged in
  if (loggedIn) {
    console.log("CreateWelcome has run.");

    // Learned to capitalise first letter of a string here:
    // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
    const name = currentUser;
    const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1);

    // Display username (admin) if user has admin rights, else just show normal welcome
    // Message includes logout button next to it
    if (adminStatus === true) {
      return (
        <div className="loginStatusDiv">
          <p>Welcome, {nameCapitalised} (admin)!</p>
          <Button
            className="logoutButton"
            variant="primary"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    } else {
      return (
        <div className="loginStatusDiv">
          <p>Welcome, {nameCapitalised}!</p>
          <Button
            className="logoutButton"
            variant="primary"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    }

    // Show message if no user is logged in
  } else {
    return (
      <div className="loginStatusDiv">
        <p>No active logins.</p>
      </div>
    );
  }
}

// Export component to be used in other files
export default CreateWelcome;
