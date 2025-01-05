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
          component: () => import("../views/collection/List.vue"),
          props: {
            parentRoute: "settings",
            label: "Settings",
          },
        },
        {
          path: "/settings/collection/:id/add",
          name: "settings_collection_add",
          component: () => import("../views/collection/Add.vue"),
          props: {
            parentRoute: "settings",
            label: "Settings",
          },
        },
        {
          path: "/settings/collection/:id/edit/:collectionID",
          name: "settings_collection_edit",
          component: () => import("../views/collection/Edit.vue"),
          props: {
            parentRoute: "settings",
            label: "Settings",
          },
        },
      ],
    },
    {
      path: "/leave",
      name: "leave",
      component: () => import("../views/leave/Leave.vue"),
    },
    {
      path: "/leave/add",
      name: "leave_add",
      component: () => import("../views/leave/Add.vue"),
    },
    {
      path: "/leave/edit/:id",
      name: "leave_edit",
      component: () => import("../views/leave/Edit.vue"),
    },
    {
      path: "/leave/view/:id",
      name: "leave_view",
      component: () => import("../views/leave/View.vue"),
    },
    {
      path: "/payroll",
      name: "payroll",
      component: () => import("../views/payroll/Payrolls.vue"),
      children: [
        {
          path: "payroll_list",
          name: "payroll_main",
          component: () => import("../views/payroll/Main.vue"),
        },

        {
          path: "add",
          name: "payroll_add",
          component: () => import("../views/payroll/Add.vue"),
        },
        {
          path: "salary_structure",
          name: "salary_structure",
          component: () =>
            import("../views/payroll/salary_structures/SalaryStructure.vue"),
        },

        {
          path: "salary_structure/add",
          name: "salary_structure_add",
          component: () => import("../views/payroll/salary_structures/Add.vue"),
        },
        {
          path: "salary_structure/edit/:id",
          name: "salary_structure_edit",
          component: () =>
            import("../views/payroll/salary_structures/Edit.vue"),
        },
        {
          path: "collection/:id",
          name: "payroll_setting_collection",
          component: () => import("../views/collection/List.vue"),
          props: {
            parentRoute: "payroll",
            label: "Payroll",
          },
        },
        {
          path: "collection/:id/add",
          name: "payroll_setting_collection_add",
          component: () => import("../views/collection/Add.vue"),
          props: {
            parentRoute: "payroll",
            label: "Payroll",
          },
        },
        {
          path: "collection/:id/edit/:collectionID",
          name: "payroll_setting_collection_edit",
          component: () => import("../views/collection/Edit.vue"),
          props: {
            parentRoute: "payroll",
            label: "Payroll",
          },
        },
      ],
    },
    {
      path: "/attendance",
      name: "attendance",
      component: () => import("../views/attendance/Attendance.vue"),
    },
    {
      path: "/attendance/checkin",
      name: "attendance_checkin",
      component: () => import("../views/attendance/CheckIn.vue"),
    },
    {
      path: "/attendance/checkout",
      name: "attendance_checkout",
      component: () => import("../views/attendance/CheckOut.vue"),
    },
    {
      path: "/import",
      name: "import",
      component: () => import("../views/import/Import.vue"),
    },
    {
      path: "/import/:collection",
      name: "import_add",
      component: () => import("../views/import/Add.vue"),
    },
  ],
});

export default router;
