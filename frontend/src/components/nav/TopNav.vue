<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();

const employee = JSON.parse(localStorage.getItem("employee"))


const menus = ref({
    start: [
        {
            name: "dashboard",
            label: "Dashboard",
            href: "/",
            isActive: () => {
                if (route.path === "/") return true;
                return false;
            },
            isChild: false,
            isAllowed: true
        },
        {
            name: "employee",
            label: "Employee",
            href: "/employee",
            isActive: () => {
                if (route.path.startsWith("/employee")) return true;
                return false;
            },
            isChild: false,
            isAllowed: true
        },
        {
            name: "leave",
            label: "Leave",
            href: "/leave",
            isActive: () => {
                if (route.path.startsWith("/leave")) return true;
                return false;
            },
            isChild: false,
            isAllowed: true
        },
        {
            name: "attendance",
            label: "Attendance",
            href: "/attendance",
            isActive: () => {
                if (route.path.startsWith("/attendance")) return true;
                return false;
            },
            isChild: false,
            isAllowed: true
        },
        {
            name: "payroll",
            label: "Payroll",
            href: "/payroll/payroll_list",
            isActive: () => {
                if (route.path.startsWith("/payroll")) return true;
                return false;
            },
            isChild: false,
            isAllowed: employee?.expand?.roles?.name === "Admin" ? true : false
        },
        {
           name: "payslip_list",
           label: "Payslip",
           href: "/payslip_list",
           isActive: () => {
                if (route.path.startsWith("/payslip_list")) return true;
                return false;
           },
           isChild: false,
           isAllowed: true
        },
        {
            name: "import",
            label: "Import",
            href: "/import",
            isActive: () => {
                if (route.path.startsWith("/import")) return true;
                return false;
            },
            isChild: false,
            isAllowed: employee?.expand?.roles?.name === "Admin" ? true : false
        },
        {
            name: "settings",
            label: "Settings",
            href: "/settings/collection/users",
            isActive: () => {
                if (route.path.includes("/settings/collection")) return true;
                return false;
            },
            isChild: false,
            isAllowed: employee?.expand?.roles?.name === "Admin" ? true : false
        },
    ],
});
</script>

<template>
    <nav class="navbar has-border-bottom is-fixed-top navbar-border-bottom" role="navigation"
        aria-label="main navigation">
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                <img style="margin-bottom: 10px" height="15" src="@/assets/logo/logo_transparent.png" />
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <template v-for="item in menus.start">
                    <RouterLink v-if="item.isAllowed" class="navbar-item" :class="item.isActive() && 'is-active-nav'"
                        :to="item.href">
                        {{ item.label }}
                    </RouterLink>
                </template>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    height: 40px !important;
}

.is-active-nav {
    background-color: var(--bulma-dark);
    color: var(--bulma-light);
}

.navbar-border-bottom {
    border-bottom: 0.1mm solid var(--bulma-dark);
}
</style>
