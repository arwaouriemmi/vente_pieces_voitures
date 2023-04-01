import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Routes from './routes';

const router = createBrowserRouter(
  createRoutesFromElements(Routes)
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  ).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);