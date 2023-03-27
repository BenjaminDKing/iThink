import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storeUser } from "./actions";
import { getUser } from "./api";

import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import FourOFour from "./components/pages/FourOFour/FourOFour";
import BuddyList from "./components/pages/BuddyList";
import ThoughtEditor from "./components/pages/ThoughtEditor";

// Color Palette: https://colorhunt.co/palette/f4f9f9ccf2f4a4ebf3aaaaaa

function App() {
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const renderUser = async () => {
    try {
      const data = await getUser();
      dispatch(storeUser(data.user))
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
          path="/*"
          element={ user ? <Home /> : <Navigate to="/login"/> }
        />
        <Route
          path="/profile"
          element={ user ? <Profile /> : <Navigate to="/login"/> }
        />
        <Route
          path="/profile/:id"
          element={ user ? <Profile /> : <Navigate to="/login"/> }
        />
        <Route 
          path="/thought/:id"
          element={ user ? <ThoughtEditor /> : <Navigate to="/login" /> }
        />
        <Route
          path="/buddies"
          element={ user ? <BuddyList /> : <Navigate to="/login"/> }
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
        <Route 
          path="*"
          element={ <FourOFour /> }
        />
      </Routes>
    </div>
  );
}

export default App;
