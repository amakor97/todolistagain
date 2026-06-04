import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const Root = document.getElementById("root");

if (Root) {
  createRoot(Root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
