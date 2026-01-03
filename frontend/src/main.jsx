import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
import "./styles/layout.css";
import "./styles/form.css";
import "./styles/list.css";
import "./styles/responsive.css";
import "./styles/buttons.css";
import "./styles/pagination.css";
import "./styles/modal.css";
import "./styles/feedback.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
