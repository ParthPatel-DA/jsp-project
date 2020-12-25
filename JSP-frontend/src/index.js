import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./index.css";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { login } from "./actions/index";
import { history } from "./App";

const rootElement = document.getElementById("root");
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, rootElement);
    hasRendered = true;
  }
};

ReactDOM.render(<div>Loading...</div>, rootElement);

let auth = localStorage.getItem("auth");
if (auth) {
  auth = JSON.parse(auth);
  store.dispatch(login(auth));
  renderApp();
} else {
  renderApp();
  const path = history.location.pathname;
  if (path === "/" || path === "/signup") {
    history.push(path);
  } else {
    history.push({
      pathname: "/",
      search: `?r=${path}`,
    });
  }
}

reportWebVitals();
