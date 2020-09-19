import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import AddPhotoPage from "../pages/AddPhotoPage/AddPhotoPage";

import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage"

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/add-photo" component={AddPhotoPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
