<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const menus = ref({
    start: [
        {
            name: "dashboard",
            label: "Dashboard",
            href: "/",
            isChild: false
        },
        {
            name: "employee",
            label: "Employee",
            href: "/employee",
            isChild: false
        }
    ]
});
</script>


<template>

    <nav class="navbar has-border-bottom is-fixed-top navbar-border-bottom " role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                <img style="margin-bottom: 10px;" height="15" src="@/assets/logo/logo_transparent.png" />
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <RouterLink v-for="item in menus.start" class="navbar-item" activeClass="is-active-nav" :to="item.href">
                     {{  item.label  }}
                </RouterLink>
            </div>
        </div>
    </nav>
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
