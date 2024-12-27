<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
let menus = [
    {
        path: "/settings/user",
        label: "User",
        icon: null,
    },
    {
        path: "/settings/company",
        label: "Company",
        icon: null,
    },
    {
        path: "/settings/department",
        label: "Deparyment",
        icon: null,
    },
];
const route = useRoute();
console.log(route.path);
</script>

<template>
    <div class="columns">
        <div class="column is-2 box">
            <!-- setting side nav -->
            <aside class="menu">
                <ul class="menu-list">
                    <li v-for="item in menus">
                        <RouterLink
                            :to="item.path"
                            :class="
                                route.path.includes(item.path) &&
                                'is-active-nav'
                            "
                            >{{ item.label }}</RouterLink
                        >
                    </li>
                </ul>
            </aside>
            <!-- setting side nav -->
        </div>
        <div class="column is-10 ml-4">
            <router-view />
        </div>
    </div>
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
