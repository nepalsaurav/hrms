<script setup>
import SideNavLink from "./SideNavLink.vue";
const props = defineProps({
    menus: Array,
});
</script>

<template>
    <aside class="menu">
        <ul class="menu-list">
            <template v-for="item in props.menus">
                <li>
                    <SideNavLink :item="item" />
                </li>
            </template>
        </ul>
    </aside>
</template>
