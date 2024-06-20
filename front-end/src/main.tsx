// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
//@ts-expect-error "importing bootstrap code"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import bootstrap from "bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
