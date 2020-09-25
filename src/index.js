import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import MoviesApp from "./MoviesApp/MoviesApp";


ReactDOM.render(
  <BrowserRouter>
    <MoviesApp />
  </BrowserRouter>,

  document.getElementById("root")
);
