import './styles.css';

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

window.addEventListener("load", () => {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById("react-root")
  );
});