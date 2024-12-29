import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/print",
      name: "print",
      component: () => import("../views/Print.vue"),
    },
    {
      path: "/employee",
      name: "employee",
      children: [
        {
          path: "",
          name: "list_employee",
          component: () => import("../views/employee/Employee.vue"),
        },
        {
          path: "add",
          name: "add_employee",
          component: () => import("../views/employee/Add.vue"),
        },
        {
          path: "edit/:id",
          name: "edit_employee",
          component: () => import("../views/employee/Edit.vue"),
        },
        {
          path: "view/:id",
          name: "view_employee",
          component: () => import("../views/employee/View.vue"),
        },
      ],
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/settings/Setting.vue"),
      children: [
        {
          path: "/settings/collection/:id",
          name: "settings_collection",
          component: () => import("../views/settings/collection/List.vue"),
        },
        {
          path: "/settings/collection/:id/add",
          name: "settings_collection_add",
          component: () => import("../views/settings/collection/Add.vue"),
        },
        {
          path: "/settings/collection/:id/edit/:collectionID",
          name: "settings_collection_edit",
          component: () => import("../views/settings/collection/Edit.vue"),
        },
      ],
    },
  ],
});

export default router;
