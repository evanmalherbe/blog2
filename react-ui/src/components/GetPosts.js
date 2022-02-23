import React from "react";

// Create GetPosts class component
class GetPosts extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables.
    this.state = {
      isLoaded: props.isLoaded,
      titlesArray: [],
      postsArray: [],
      idArray: [],
      authorArray: [],
      error: null,
      dateCreatedArray: [],
      dateModifiedArray: [],
      message: null,
    };
  }

  // Component did mount function runs once only
  componentDidMount() {
    // Fetch posts from db
    fetch("/getposts")
      .then((res) => res.json())
      .then(
        (result) => {
          // Save post info to state
          this.setState(
            {
              isLoaded: true,
              titlesArray: result.titles,
              postsArray: result.posts,
              idArray: result.ids,
              authorArray: result.authors,
              dateCreatedArray: result.datecreated,
              dateModifiedArray: result.datemodified,
              message: result.message,
            },
            () => {
              console.log("Db says: " + this.state.message);

              // Send post info to function in app.js (lifting state up)
              this.props.loadPosts(
                this.state.isLoaded,
                this.state.titlesArray,
                this.state.postsArray,
                this.state.idArray,
                this.state.authorArray,
                this.state.dateCreatedArray,
                this.state.dateModifiedArray
              );
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    // End of componentdidmount
  }

  // Nothing to return
  render() {
    return null;
  }
}

// Export component to be used by other files
export default GetPosts;
