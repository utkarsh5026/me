import "@fontsource/cascadia-code/latin-400.css";
import "@fontsource/noto-sans/latin-400.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ROUTER_BASENAME } from "@/lib/utils";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
