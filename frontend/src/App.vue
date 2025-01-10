<script setup>
import TopNav from "./components/nav/TopNav.vue";
import { ref } from "vue";
import Login from "./components/Login.vue";
import { useAuthStore } from "./api/login";
import { onMounted } from "vue";
import { client } from "./api/pocketbase";

const auth = useAuthStore()



onMounted(async () => {
    client.authStore.onChange(() => {
        auth.changeCurrentUser(client.authStore.record)
    })

    localStorage.setItem("employee", JSON.stringify(await auth.getUserDetail()))
})
</script>

<template>

    <template v-if="!auth.currentUser">
         <Login/>
    </template>
    <template v-if="auth.currentUser">
        <TopNav />
        <div class="p-5" style="margin-top: 80px">
            <router-view> </router-view>
        </div>
    </template>

</template>
