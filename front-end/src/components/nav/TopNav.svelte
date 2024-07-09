<script>
  import { link } from "svelte-spa-router";
</script>

<nav>
  <ul>
    <li><strong>Acme Corp</strong></li>
    <li><a href="/" class="contrast" use:link>Dashboard</a></li>
    <li><a href="/leave" class="contrast" use:link>Leave</a></li>
  </ul>
</nav>
