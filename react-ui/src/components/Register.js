import React from "react";

import { Navigate } from "react-router-dom";

// Import React Bootstrap components
import Button from "react-bootstrap/Button";
import { Form, FormControl, FormGroup, Row, Col } from "react-bootstrap";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Function to display register page
function Register(props) {
  let showButton;

  // If user has just registered, redirect straight to login page
  if (props.justRegistered === true) {
    showButton = <Navigate to="/Login" />;

    // If user has not yet registered, display register page/form
  } else {
    showButton = (
      <div className="registerDiv">
        <h1>Register</h1>
        {/* Learned how to turn autocomplete off here: 
      https://reactgo.com/react-turn-off-autocomplete/ */}
        <Form id="registerForm" autoComplete="off" className="registerForm">
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
                onClick={props.handleRegister}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  // Return/ display form
  return <div>{showButton}</div>;
}

// Export component to be used in other files
export default Register;
