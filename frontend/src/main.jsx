import React from "react";
import ReactDOM from "react-dom/client";
import RouterApp from "./App.jsx";
import './styles/index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/style-buttons.css';

import { CarritoProvider } from "./context/CarritoContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CarritoProvider>
    <RouterApp />
    </CarritoProvider>
  </React.StrictMode>
);
