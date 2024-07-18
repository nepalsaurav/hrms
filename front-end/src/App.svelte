<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import TopNav from "./components/nav/TopNav.svelte";
</script>

<TopNav />
<div class="container main-container">
  <Router {routes} />
</div>

<style>
  .main-container {
    margin-top: 30px;
  }
</style>
