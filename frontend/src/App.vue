<script setup>
import TopNav from "./components/nav/TopNav.vue";
</script>

<template>
    <TopNav />
    <div class="container" style="margin-top: 80px;">
        <router-view v-slot="{ Component }">
            <transition name="slide-left">
                <component :is="Component">
                </component>
            </transition>
        </router-view>
    </div>
</template>
