import React from "react";
import {Switch, Route} from "react-router-dom";
import store from "../Config/Store";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Pages/Login";
// import Home from "../Pages/";
import Office from "../Pages/Managment/Office";
// import Landing from "../Pages/Landing/landing";
import Register from "../Pages/Register/Register";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
// import Dashboard from "../Pages/Dashboard/Dashboard";

import jwt_decode from "jwt-decode";
import setStoreToken from "../Utils/setStoreToken";
import { setCurrentStore, logoutStore } from "../Utils/storeAuthActions";

// Check for token to keep user logged in
if (localStorage.store_jwtToken) {
    // Set auth token header auth
    const token = localStorage.store_jwtToken;
    setStoreToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentStore(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutStore());
      // Redirect to login
      window.location.href = "./login";
    }
  }

const Router =()=>(
    <Switch>                      
        <PrivateRoute exact path="/" component={Office}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
    </Switch>
)

export default Router;