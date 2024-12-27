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
          path: "user",
          name: "user",
          component: () => import("../views/settings/user/User.vue"),
        },
        {
          path: "user/add",
          name: "add_user",
          component: () => import("../views/settings/user/Add.vue"),
        },
      ],
    },
  ],
});

export default router;
