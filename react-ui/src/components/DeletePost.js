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
                  "Delete post page says: Post request to delete blog post sent. " +
                    result.message
                );
                alert("The blog post has been removed.");
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
    if (this.props.postToDelete === false && this.props.adminStatus === true) {
      showDeletePost = <Navigate to="/AdminArea" />;
    } else if (
      this.props.postToDelete === false &&
      this.props.adminStatus === false
    ) {
      showDeletePost = <Navigate to="/ModifyPosts" />;
    }
    return showDeletePost;
  }
}

export default DeletePost;
