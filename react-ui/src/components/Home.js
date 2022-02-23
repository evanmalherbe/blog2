import React from "react";

// Import custom stylesheet
import "../App.css";

// Import components
import RightPanel from "./RightPanel";
import CentrePanel from "./CentrePanel";
import LeftPanel from "./LeftPanel";

// Function to display home page with posts from all blog authors. What centre panel displays is
// determined by who is logged in and which menu link user has clicked
function Home(props) {
  return (
    <div className="bodyDiv">
      <LeftPanel
        usersArray={props.usersArray}
        updateSelectedUser={props.updateSelectedUser}
      />
      <CentrePanel
        selectedUser={props.selectedUser}
        titlesArray={props.titlesArray}
        idArray={props.idArray}
        postsArray={props.postsArray}
        authorArray={props.authorArray}
        message={props.message}
        dateCreatedArray={props.dateCreatedArray}
        dateModifiedArray={props.dateModifiedArray}
      />
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default Home;
