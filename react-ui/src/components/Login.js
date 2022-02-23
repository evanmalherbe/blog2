import React from "react";

import { Navigate } from "react-router-dom";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl, FormGroup, Row, Col } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Import components
import GoogleLoginButton from "./GoogleLoginButton";
//import FacebookLoginButton from "./FacebookLoginButton";
import FacebookLoginComponent from "./FacebookLoginButton";

// Function to display login page
function Login(props) {
  let showLoginPage;

  // Learned to redirect/Navigate with react router here:
  // https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  // If user has successfully logged in, display create new post page
  if (props.authMessage === "Success! Token valid.") {
    showLoginPage = <Navigate to="/CreatePost" />;

    // If user not yet logged in, display login page/form
  } else {
    showLoginPage = (
      <div className="loginDiv">
        <h1>Log in</h1>
        {/* Learned how to turn autocomplete off here: 
      https://reactgo.com/react-turn-off-autocomplete/ */}

        <Form id="loginForm" autoComplete="off" className="loginForm">
          <FormGroup className="mb-3">
            {" "}
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Enter username"
              onChange={props.handleUsername}
            />{" "}
          </FormGroup>
          <FormGroup className="mb-3">
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Enter password"
              onChange={props.handlePassword}
            />{" "}
          </FormGroup>
          <Row className="mb-3">
            <Col>
              <Button
                className="buttons"
                variant="primary"
                type="button"
                onClick={() => props.handleLogin()}
              >
                Login
              </Button>
            </Col>{" "}
          </Row>
          <Row className="mb-3">
            <Col>
              <GoogleLoginButton handleGoogleLogin={props.handleGoogleLogin} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <FacebookLoginComponent
                handleFacebookLogin={props.handleFacebookLogin}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  // return . display login page
  return <div>{showLoginPage}</div>;
}

// Export component to be used in other files
export default Login;
