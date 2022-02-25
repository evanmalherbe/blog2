import React from "react";

import { Navigate } from "react-router-dom";

// Create register user class component
class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      message: null,
      justRegistered: false,
    };
  }

  // Component did mount function runs once only
  componentDidMount() {
    if (this.props.userToRegister === true) {
      // Send post request to db to add user
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.props.username,
          password: this.props.password,
          admin: false,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                justRegistered: true,
              },
              () => {
                console.log(
                  "Register user page says: Registration details sent via post."
                );
                if (
                  this.props.loggedInWithGoogle === true ||
                  this.props.loggedInWithFacebook === true
                ) {
                  alert("New user, " + this.props.username + ", registered.");
                } else {
                  alert(
                    "New user, " +
                      this.props.username +
                      ", registered. Please log in."
                  );
                }
                this.props.reloadForRegisterUser();
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );

      // End of if statement to check if post should be added
    }
    // End of componentdidmount
  }

  // Nothing to return
  render() {
    let runRegister = null;
    if (this.state.justRegistered === true) {
      console.log("just registered is true");
      runRegister = <Navigate to="/Login" />;
    } else {
      console.log("just registered is still false.");
    }
    return runRegister;
  }
}

// Export component to be used by other files
export default RegisterUser;
