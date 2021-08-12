import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function Contatos() {
    return (
      <div>
        <h2>Lista contatos</h2>
      </div>
    );
  }

  function Signin() {
    return (
      <div>
        <h2>Login</h2>
      </div>
    );
  }
  function Signup() {
    return (
      <div>
        <h2>Cadastro</h2>
      </div>
    );
  }

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/contacts">
              <Contatos />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
