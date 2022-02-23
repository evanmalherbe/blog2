import React from "react";

// Import images
import beach from "../beach.jpg";
import pc from "../pc.jpg";

// Import custom stylesheet
import "../App.css";

// Function to display rightpanel with decorative images
function RightPanel(props) {
  return (
    <div className="rightPanel">
      <img src={beach} alt="Beach scene" className="beachImg" />
      <img src={pc} alt="Lady's hands at computer" className="pcImg" />
    </div>
  );
}

// Export component to be used in other files
export default RightPanel;
