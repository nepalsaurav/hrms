<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  const navbar = [
    {
      label: "Dashboard",
      url: "/",
      path: "/",
    },
    {
      label: "Leave",
      url: "/leave/",
      path: "/leave/*",
    },
  ];
</script>

<div class="d-flex flex-column flex-shrink-0 p-3">
  <a
    href="/"
    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
  >
    <svg class="bi me-2" width="40" height="32"
      ><use xlink:href="#bootstrap"></use></svg
    >
    <span class="fs-4">HRMS</span>
  </a>
  <hr />
  <ul class="nav nav-pills flex-column mb-auto">
    {#each navbar as item (item.url)}
      <li class="nav-item">
        <a
          use:link
          href={item.url}
          class="nav-link"
          use:active={{
            path: item.path,
            className: "active",
            inactiveClassName: "link-dark",
          }}>{item.label}</a
        >
      </li>
    {/each}
  </ul>
  <hr />
  <div class="dropdown">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href="#"
      class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
      id="dropdownUser2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        src="https://github.com/mdo.png"
        alt=""
        width="32"
        height="32"
        class="rounded-circle me-2"
      />
      <strong>mdo</strong>
    </a>
    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <!-- svelte-ignore a11y-invalid-attribute -->
      <li><a class="dropdown-item" href="#">New project...</a></li>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <li><a class="dropdown-item" href="#">Settings</a></li>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <li><a class="dropdown-item" href="#">Profile</a></li>
      <li><hr class="dropdown-divider" /></li>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <li><a class="dropdown-item" href="#">Sign out</a></li>
    </ul>
  </div>
</div>
