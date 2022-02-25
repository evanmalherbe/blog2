import React from "react";

import { Navigate } from "react-router-dom";

// Create Add post class component
class AddPost extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      message: null,
    };
  }

  // Component did mount function runs once only
  componentDidMount() {
    if (this.props.postToAdd === true) {
      // Add post to db
      fetch("/addpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          author: this.props.author,
          title: this.props.title,
          post: this.props.post,
          datecreated: this.props.datecreated,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                message: result.message,
              },
              () => {
                console.log("Blog post saved. Reply is: " + this.state.message);
                this.props.reload();
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
    let showAddPost = null;
    if (this.props.postToAdd === false && this.props.adminStatus === true) {
      showAddPost = <Navigate to="/AdminArea" />;
    } else if (
      this.props.postToAdd === false &&
      this.props.adminStatus === false
    ) {
      showAddPost = <Navigate to="/ModifyPosts" />;
    }
    return showAddPost;
  }
}

// Export component to be used by other files
export default AddPost;
