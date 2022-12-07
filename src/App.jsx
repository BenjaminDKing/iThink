import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { getUser } from "./api.js";

// Color Palette: https://colorhunt.co/palette/f4f9f9ccf2f4a4ebf3aaaaaa

function App() {
  
  const [user, setUser] = useState(null);

  const renderUser = async () => {
    try {
      const data = await getUser();
      setUser(data.user);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    renderUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route 
          exact
          path="/"
          element={ user ? <Home user={user} /> : <Navigate to="/login"/> }
        />
        <Route
          path="/profile"
          element={ <Profile user={user} /> }
        />
        <Route
          path="/profile/:id"
          element={ <Profile user={user} /> }
        />
        <Route 
          exact
          path="/login"
          element={ user ?  <Navigate to="/"/> : <Login />}
        />
        <Route 
          path="/signup"
          element={ user ? <Navigate to="/"/> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
