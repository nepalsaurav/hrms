import "@/assets/css/bulma.scss";
import "@/assets/css/tree.css";
import "@/assets/css/tree_grid.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "pikaday/css/pikaday.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
