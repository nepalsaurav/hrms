<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
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
        },
        {
            name: "employee",
            label: "Employee",
            href: "/employee",
            isActive: () => {
                if (route.path.includes("/employee")) return true;
                return false;
            },
            isChild: false,
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
        },
    ],
});
</script>

<template>
    <nav
        class="navbar has-border-bottom is-fixed-top navbar-border-bottom"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                <img
                    style="margin-bottom: 10px"
                    height="15"
                    src="@/assets/logo/logo_transparent.png"
                />
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <RouterLink
                    v-for="item in menus.start"
                    class="navbar-item"
                    :class="item.isActive() && 'is-active-nav'"
                    :to="item.href"
                >
                    {{ item.label }}
                </RouterLink>
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
