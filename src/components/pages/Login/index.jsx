import React from "react";
import { Link } from "react-router-dom";
import { googleAuthCall } from "../../../api.js";

function Login() {
    const googleAuth = () => {
        googleAuthCall();
    }

    return (
        <div>
            <button onClick={googleAuth}>Login with Google</button>
        </div>
    )
}

export default Login;