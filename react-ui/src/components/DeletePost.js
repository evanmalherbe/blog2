import React from "react";

import { Navigate } from "react-router-dom";

// Create DeletePost class component
class DeletePost extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    // Learned how to use window.confirm here:
    // https://stackoverflow.com/questions/63311845/unexpected-use-of-confirm-no-restricted-globals
    if (this.props.postToDelete === true) {
      fetch("/deletepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.props.postId,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: false,
              },
              () => {
                console.log(
                  "Post request to delete blog post sent. " + result.message
                );
                this.props.reloadForDeletePost();
              }
            );
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error,
            });
          }
        );

      // End of if statement to check if delete button has been clicked
    }

    // End of componentdidmount
  }

  render() {
    let showDeletePost = null;
    if (this.props.postToDelete === false) {
      showDeletePost = <Navigate to="/AdminArea" />;
    }
    return showDeletePost;
  }
}

export default DeletePost;
