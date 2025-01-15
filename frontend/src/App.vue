<script setup>
import TopNav from "./components/nav/TopNav.vue";
import Login from "./components/Login.vue";
import { useAuthStore } from "./api/login";
import { onMounted } from "vue";
import { client } from "./api/pocketbase";
import { ref } from "vue";
import LoadingSkeleton from "./components/LoadingSkeleton.vue";
import { useStorage } from "@vueuse/core";

const auth = useAuthStore()


onMounted(async () => {
    client.authStore.onChange(() => {
        auth.changeCurrentUser(client.authStore.record)
    })

    const employee = await auth.getUserDetail()
    localStorage.setItem("employee", JSON.stringify(employee))
    auth.loading = false


    try {
        const record = await client.send("/api/get_settings/settings.json", {$autoCancel: false});
        localStorage.setItem("settings", JSON.stringify(record))
    } catch {}
})
</script>

<template>

    <template v-if="!auth.currentUser">
        <Login />
    </template>
    <template v-if="auth.currentUser">
        <template v-if="auth.loading">
            <LoadingSkeleton/>
        </template>
        <template v-if="!auth.loading">
            <TopNav />
            <div class="p-5" style="margin-top: 80px">
                <router-view> </router-view>
            </div>
        </template>
    </template>

</template>
