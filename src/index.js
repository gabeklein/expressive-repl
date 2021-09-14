import './styles.css';

import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

window.addEventListener("load", () => {
  const container = document.getElementById("react-root");
  const element = React.createElement(App);
  ReactDOM.render(element, container);
});