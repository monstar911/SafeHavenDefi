import React from "react";
import { HashRouter } from "react-router-dom";
import App from "./App";

function Root() {
  const app = () => (
    <HashRouter>
      <App />
    </HashRouter>
  );

  return app();
}

export default Root;
