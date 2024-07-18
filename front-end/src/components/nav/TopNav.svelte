<script>
  import { link } from "svelte-spa-router";
  const navbar = {
    "me-auto": [
      {
        label: "Dashboard",
        url: "/",
      },
      {
        label: "Leave",
        url: "/leave",
      },
    ],
  };
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/" use:link>HRMS APP</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {#each Object.entries(navbar) as [key, items] (key)}
        <ul class="navbar-nav {key} mb-2 mb-lg-0">
          {#each items as item (item.url)}
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href={item.url}
                use:link>{item.label}</a
              >
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  </div>
</nav>
