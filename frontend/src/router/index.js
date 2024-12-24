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
          component: () => import("../views/employee/Add.vue")
        }
      ]
    },
    
  ],
});

export default router;
