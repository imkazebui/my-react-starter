import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// Styles
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "../scss/style.scss";
// Temp fix for reactstrap
import "../scss/core/_dropdown-menu-right.scss";

// Views
import { Login } from "./modules/auth";

import { Container } from "reactstrap";
import Header from "./modules/common/Header/";
import Sidebar from "./modules/common/Sidebar/";
import Breadcrumb from "./modules/common/Breadcrumb/";
import Aside from "./modules/common/Aside/";
import Footer from "./modules/common/Footer/";

import PrivateRoute from "./modules/common/PrivateRoute";
import Spinners from "./modules/common/Spinners/";
import Toastr from "./modules/common/Toastr/";

export default class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />

            <PrivateRoute path="/" name="Home" component={MainApp} />
          </Switch>
        </HashRouter>
        <Spinners />
        <Toastr />
      </div>
    );
  }
}

class MainApp extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Redirect from="/" to="/login" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}
