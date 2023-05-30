import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import NavbarSection from "./components/navbarSection/Navbar";
import RoutesComponent from './routesComponent'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarSection />
      <RoutesComponent />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
