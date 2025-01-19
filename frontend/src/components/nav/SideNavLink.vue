<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const props = defineProps({
    item: Object,
});
const showChild = ref(false);
function toggleChildNav(item) {
    if (item.hasChild) {
        showChild.value = !showChild.value;
        
    }
}
</script>
<template>
    <RouterLink
        :to="!props.item.hasChild && props.item.path"
        :class="route.path.includes(props.item.name) && 'is-active-nav'"
        @click="toggleChildNav(props.item)"
    >
        {{ props.item.label }}
        <span class="pl-3" v-if="props.item.hasChild">
            <i class="bi bi-chevron-down" v-if="!showChild"></i>
            <i class="bi bi-chevron-up" v-if="showChild"></i>
        </span>
    </RouterLink>
    <Transition>
        <ul v-if="props.item.hasChild && showChild">
            <li v-for="child in props.item.children">
                <RouterLink
                    :to="child.path"
                    :class="route.path.includes(child.name) && 'is-active-nav'"
                    >{{ child.label }}</RouterLink
                >
            </li>
        </ul>
    </Transition>
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
