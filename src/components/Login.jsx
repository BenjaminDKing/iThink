import React from "react";

function Login() {

    const onSuccess = (res) => {
        console.log("Login Success! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Login Failure! res: ", res);
    }

    return (
        <div id="signInButton">
            <button>Login With Google</button>
        </div>
    )
}

export default Login;