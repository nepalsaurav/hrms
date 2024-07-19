<script>
  function toggleSidebar() {
    console.log("sdsadsad");
    document.querySelector(".sidebar")?.classList.toggle("collapsed");
  }
</script>

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <a
            on:click={toggleSidebar}
            id="btn-collapse"
            title="collapsed sidebar"
            class="sidebar-collapser nav-link"
            style="cursor: pointer;"><i class="fa-solid fa-bars"></i></a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
