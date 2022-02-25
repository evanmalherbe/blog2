import React from "react";

import { Navigate } from "react-router-dom";

// Create UpdateePost class component
class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    if (this.props.postToUpdate === true) {
      console.log("Reached update post component");
      fetch("/updatepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.props.postId,
          title: this.props.postTitle,
          post: this.props.postBody,
          dateMod: this.props.dateModified,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            // this.setState(
            //   {
            //     isLoaded: false,
            //   },
            //   () => {
            console.log(
              "Post request to update blog post sent. " + result.message
            );
            alert("The blog post has been updated.");
            this.props.reloadForUpdatePost();
            // }
            // );
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error,
            });
          }
        );

      // End of if statement to check if Update button has been clicked
    }

    // End of componentdidmount
  }

  render() {
    let showUpdatePost = null;

    if (this.props.postToUpdate === false && this.props.adminStatus === true) {
      console.log("1");
      showUpdatePost = <Navigate to="/AdminArea" />;
    } else if (
      this.props.postToUpdate === false &&
      this.props.adminStatus === false
    ) {
      console.log("2");
      showUpdatePost = <Navigate to="/ModifyPosts" />;
    }

    return showUpdatePost;
  }
}

export default UpdatePost;
