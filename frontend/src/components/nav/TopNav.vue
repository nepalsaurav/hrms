<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { isAllow } from "@/api/role";
import DropdownNav from "./DropdownNav.vue";
import { useStorage } from "@vueuse/core";
import { client } from "@/api/pocketbase";
import Avatar from "../Avatar.vue";

const route = useRoute();

let employee = useStorage("employee")
employee = JSON.parse(employee.value)


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
            isAllowed: isAllow({
                type: "navigation"
            })
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
            isAllowed: isAllow({
                type: "navigation"
            })
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
            isAllowed: isAllow({
                type: "navigation"
            })
        },
    ],
});

function handleLogOut() {
     client.authStore.clear()
}
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
            <div class="navbar-end">
                <DropdownNav>
                    <template #label>
                        <span>{{ client.authStore.record.name.split(" ")[0] }}</span>
                        <Avatar :filename="employee?.photo" :record="employee" size="25x24" />
                    </template>
                    <template #dropdown>
                        <div class="navbar-dropdown is-boxed">
                            <a class="navbar-item" @click="handleLogOut">
                                Log out
                            </a>
                        </div>
                    </template>
                </DropdownNav>
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
