import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Routes from "./routes";
import HeroSection from "./components/HeroSection";
import NavbarSection from "./components/navbarSection/Navbar";

const router = createBrowserRouter(createRoutesFromElements(Routes));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarSection isAuthentificated={false} id={"5"} role="user" />
    </BrowserRouter>
    <HeroSection />
    <RouterProvider router={router} />
  </React.StrictMode>
);
