/*import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Routes from "./routes";
import NavbarSection from "./components/navbarSection/Navbar";*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import NavbarSection from "./components/navbarSection/Navbar";
import RoutesComponent from './routesComponent'

/*const router = createBrowserRouter(createRoutesFromElements(Routes));*/

/*const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarSection />
    </BrowserRouter>
    <RouterProvider router={router} />
  </React.StrictMode>
);*/
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarSection />
      <RoutesComponent />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
