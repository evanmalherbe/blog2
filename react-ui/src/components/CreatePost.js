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

// Function to display create post page
function CreatePost(props) {
  let showCreatePost;

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  // If statement to only show create post page if user has been authenticated, else go back to home page
  if (
    props.authMessage === "Success! Token valid." &&
    props.postToAdd === false
  ) {
    showCreatePost = (
      <div className="createPostDiv">
        <h1>Create New Post</h1>

        {/* Form to create/save new blog post.  */}
        <Form id="createPostForm" autoComplete="off" className="createPostForm">
          <FormGroup className="mb-3">
            {" "}
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Choose a title for your post"
              onChange={props.handleTitle}
            />{" "}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Type your blog post here"
              onChange={props.handlePost}
            />{" "}
          </FormGroup>
          <Row>
            <Col sm={3}>
              <Button
                className="buttons"
                variant="primary"
                type="button"
                onClick={props.handleSavePost}
              >
                Save Post
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  } else if (props.postToAdd === true) {
    showCreatePost = <Navigate to="/AddPost" />;

    // If not logged in, redirect to home page
  } else {
    showCreatePost = <Navigate to="/" />;
  }

  // Return/display create post page
  return (
    <div className="bodyDiv">
      <LeftPanel createPostActive={props.createPostActive} />
      {showCreatePost}
      <RightPanel />
    </div>
  );
}

// Export component to be used in other files
export default CreatePost;
