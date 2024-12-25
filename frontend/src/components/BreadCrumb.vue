<script setup>
const props = defineProps(["links"]);
import { RouterLink } from "vue-router";
</script>
<template>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li v-for="link in props.links">
                <RouterLink
                    class="has-text-dark"
                    :class="link.isActive && 'has-text-weight-bold'"
                    :area-current="link.isActive && 'page'"
                    :to="link.path"
                >
                    {{ link.label }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
a:hover {
    text-decoration: underline;
}
</style>
