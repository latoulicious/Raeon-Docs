import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/theme.css";
import "./styles/layout.css";

const root = document.getElementById("root");
if (!root) throw new Error("root element #root not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
