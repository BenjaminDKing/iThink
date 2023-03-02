import React from "react";
import { Link } from "react-router-dom";
import { googleAuthCall } from "../../../api.js";
import "./index.css";
const google = require('../../../images/google.png')

function Login() {
    const googleAuth = () => {
        googleAuthCall();
    }

    return (
        <div className="google-container" onClick={googleAuth}>
            <img className="google-image" src={google} alt="google-image"/> Login with Google
        </div>
    )
}

export default Login;