import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Login from "./containers/login/Login";
import Signup from "./containers/signup/Signup";
import MainApp from "./containers/app";

export const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/app" component={MainApp} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
