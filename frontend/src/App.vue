<script setup>
import TopNav from "./components/nav/TopNav.vue";
</script>

<template>
    <TopNav />
    <div class="p-5" style="margin-top: 80px">
        <router-view> </router-view>
    </div>
</template>
