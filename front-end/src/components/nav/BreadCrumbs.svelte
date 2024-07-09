<script>
  import { link } from "svelte-spa-router";

  export let breadcrumbs;
</script>

<nav aria-label="breadcrumb">
  <ul>
    {#each breadcrumbs as item (item.url)}
      {#if !item.isCurrent}
        <li><a href={item.url} use:link>{item.label}</a></li>
      {:else}
        <li>{item.label}</li>
      {/if}
    {/each}
  </ul>
</nav>
