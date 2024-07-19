import { wrap } from "svelte-spa-router/wrap";

export const routes = {
  "/": wrap({
    asyncComponent: () => import("./routes/home.svelte"),
  }),

  //leave page
  "/leave/": wrap({
    asyncComponent: () => import("./routes/leave/List.svelte"),
  }),
  "/leave/add/": wrap({
    asyncComponent: () => import("./routes/leave/Add.svelte"),
  }),
};
