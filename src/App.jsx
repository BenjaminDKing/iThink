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
  const [data, setData] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      var { data } = await axios.get(url, {withCredentials: true});
      // req.user works *from any route* if called at this stage from the main App.jsx
      // *For some reason*, req.user is not defined on GET requests made from other components
      console.log(data);
      setUser(data.user);
      setThoughts(data.thoughts);
      setData(data);
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
          element={ user ? <Home data={data} user={user} thoughts={thoughts}/> : <Navigate to="/login"/> }
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
