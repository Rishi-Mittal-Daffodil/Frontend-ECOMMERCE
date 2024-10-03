import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import UserAuthContext from "./userContext/UserAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserAuthContext>
    <StrictMode>
      <App />
    </StrictMode>
  </UserAuthContext>
);
