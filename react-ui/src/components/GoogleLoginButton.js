import React from "react";

import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../Utils/refreshToken";

// Learned how to create Google login button here:
// https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del

function GoogleLoginButton(props) {
  // Google client id
  const clientId =
    "814875559791-253acrmfifcppvudqmbq3790gi63k7sv.apps.googleusercontent.com";

  // Run this on successful google login
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj.name);

    refreshTokenSetup(res);
    // Send google username and id to app.js to be used to log user in
    props.handleGoogleLogin(true, res.profileObj.name, res.profileObj.googleId);
  };

  // Console log message on failure to log in
  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  // Display Google login button
  return (
    <div>
      {" "}
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
      />
    </div>
  );
}

// Export component to be used by other files
export default GoogleLoginButton;
