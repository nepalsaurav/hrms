<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import TopNav from "./components/nav/TopNav.svelte";
  import SideNav from "./components/nav/SideNav.svelte";
</script>

<aside class="sidebar">
  <SideNav />
</aside>
<div class="layout">
  <header class="header">
    <TopNav />
  </header>
  <main class="content container">
    <Router {routes} />
  </main>
  <div class="overlay"></div>
</div>
