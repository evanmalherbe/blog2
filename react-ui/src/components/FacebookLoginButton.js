import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import "../App.css";

function FacebookLoginComponent(props) {
  const [login, setLogin] = useState(false);

  const responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }

    if (response.accessToken) {
      setLogin(true);
      props.handleFacebookLogin(response.name, true, response.userID);
    } else {
      setLogin(false);
    }
  };

  return (
    <div>
      {!login && (
        <FacebookLogin
          appId="640271867025410"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}
    </div>
  );
}

export default FacebookLoginComponent;
