<script setup>
import TopNav from "./components/nav/TopNav.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
</script>

<template>
    <TopNav />
    <div class="container" style="margin-top: 80px">
        <router-view> </router-view>
    </div>
</template>
