// Add this at the beginning of your app entry.
import "vite/modulepreload-polyfill";
//@ts-ignore
import Trix from "trix";
import "../node_modules/trix/dist/trix.css";
import "../node_modules/flatpickr/dist/flatpickr.min.css";
import "./scss/main.scss";
import "../node_modules/flexboxgrid/css/flexboxgrid.min.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
