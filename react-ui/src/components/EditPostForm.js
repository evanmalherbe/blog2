import React from "react";

import { Navigate } from "react-router-dom";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl, FormGroup, Row, Col } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

// Import custom stylesheet
import "../App.css";

// Function to display edit post form
function EditPostForm(props) {
  let showEditPostForm;

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  if (props.postToUpdate === true) {
    showEditPostForm = <Navigate to="/UpdatePost" />;
  } else {
    // Show edit post form if user is logged in and has clicked the edit post button
    if (
      props.authMsg === "Success! Token valid." &&
      props.showEditPost === true
    ) {
      console.log("Edit post form page.");
      showEditPostForm = (
        <div className="editPostDiv">
          <h1>Edit Post</h1>

          <p>
            Post Author: <b>{props.author}</b>
          </p>
          <Form id="editPostForm" autoComplete="off" className="editPostForm">
            <FormGroup className="mb-3">
              {" "}
              <FormControl
                type="text"
                name="title"
                defaultValue={props.title}
                onChange={props.handleTitle}
              />{" "}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows={10}
                name="post"
                defaultValue={props.post.replace("///", "")}
                onChange={props.handlePost}
              />{" "}
            </FormGroup>
            <Row>
              <Col sm={3}>
                <Button
                  className="buttons"
                  variant="success"
                  type="button"
                  onClick={() => props.handleEditPost(props.id)}
                >
                  Update Post
                </Button>
              </Col>
              <Col>
                <Button
                  className="buttons"
                  variant="danger"
                  type="button"
                  onClick={() => props.handleCancelEdit()}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      );
      // Go back to admin area if user clicked the button to "cancel" the edit
    } else if (props.showEditPost === false || props.editCanceled === true) {
      if (props.adminStatus === true) {
        showEditPostForm = <Navigate to="/AdminArea" />;
      } else {
        showEditPostForm = <Navigate to="/ModifyPosts" />;
      }

      // Redirect home if user is not logged in and hasn't clicked the edit post button
    } else if (props.authMsg !== "Success! Token valid.") {
      showEditPostForm = <Navigate to="/" />;
    }

    // End of if statement to check if "posttoupdate" variable is true (i.e. has user clicked "Update post"
    // button)
  }

  // Return/ display page
  return (
    <div className="bodyDiv">
      <LeftPanel showEditPost={props.showEditPost} />
      {showEditPostForm}
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default EditPostForm;
