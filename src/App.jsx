import React, { useEffect, useState } from "react";
import { BrowserRoute } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

// Color Palette: https://colorhunt.co/palette/f4f9f9ccf2f4a4ebf3aaaaaa

function App() {
  const [user, setUser] = useState(null);
  const [thoughts, setThoughts] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, {withCredentials: true});
      setUser(data.user);
      setThoughts(data.thoughts);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route 
          exact
          path="/"
          element={ user ? <Home user={user} thoughts={thoughts}/> : <Navigate to="/login"/> }
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
