import React from "react";
import { Switch, Route } from "react-router-dom";
import { useStyles } from "./styles";
import Home from "./home/Home";
import Header from "../../components/header/Header";

const MainApp = (props) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className={classes.content}>
        <Switch>
          <Route path="/app" component={Home} />
        </Switch>
      </main>
    </>
  );
};

export default MainApp;
