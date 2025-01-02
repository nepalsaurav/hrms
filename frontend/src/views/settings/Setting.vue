<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

let menus = [
    {
        path: "/settings/collection/users",
        name: "user",
        label: "User",
        icon: null,
        hasChild: false,
    },
    {
        path: "/settings/collection/company",
        name: "company",
        label: "Company",
        icon: null,
        hasChild: false,
    },
    {
        path: "/settings/collection/department",
        name: "department",
        label: "Department",
        hasChild: false,
        icon: null,
    },
    {
        path: `/settings/collection/branch?expand=company&expand_label=name`,
        name: "branch",
        label: "Branch",
        icon: null,
        hasChild: false,
    },
    {
        name: "leave_setting",
        label: "Leave",
        hasChild: true,
        icon: null,
        children: [
            {
                path: "/settings/collection/leave_type",
                name: "leave_type",
                label: "Leave Type",
                icon: null,
            },
        ],
    },
    // {
    //     path: "/settings/collection/roles",
    //     name: "roles",
    //     label: "Roles",
    //     icon: null,
    // },
    // {
    //     path: "/settings/collection/permissions",
    //     name: "permissions",
    //     label: "Permissions",
    //     icon: null,
    // },
];
const route = useRoute();
</script>

<template>
    <div class="columns">
        <div class="column is-2 box">
            <!-- setting side nav -->
            <aside class="menu">
                <ul class="menu-list">
                    <li v-for="item in menus">
                        <RouterLink
                            :to="!item.hasChild && item.path"
                            :class="
                                route.path.includes(item.name) &&
                                'is-active-nav'
                            "
                            >{{ item.label }}</RouterLink
                        >

                        <ul v-if="item.hasChild">
                            <li v-for="child in item.children">
                                <RouterLink
                                    :to="child.path"
                                    :class="
                                        route.path.includes(child.name) &&
                                        'is-active-nav'
                                    "
                                    >{{ child.label }}</RouterLink
                                >
                            </li>
                        </ul>
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
