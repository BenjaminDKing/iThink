import React from "react";
import { Link } from "react-router-dom";

function Login() {
    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        )    
    }

    return (
        <div>
            <button onClick={googleAuth}>Login with Google</button>
        </div>
    )
}

export default Login;