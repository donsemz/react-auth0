import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-p7j2vojjf8zbvxon.us.auth0.com"
    clientId="zbH9WqSjCXzctIF6UpQZXb5I2LRniyF7"
    redirectUri={window.location.origin}
    audience="my identifier"
    scope="openid profile email">
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
