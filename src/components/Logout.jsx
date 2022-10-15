import React from "react";

function Logout() {

    const onSuccess = () => {
        console.log("Log out successful!")
    }

    return (
        <div id="signOutButton">
            <GoogleLogout 
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;