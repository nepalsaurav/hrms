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
  "/leave/view/:id/": wrap({
    asyncComponent: () => import("./routes/leave/View.svelte"),
  }),
  "/leave/edit/:id/": wrap({
    asyncComponent: () => import("./routes/leave/Edit.svelte"),
  }),
};
