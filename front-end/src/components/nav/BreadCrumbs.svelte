<script>
  import { link } from "svelte-spa-router";

  export let breadcrumbs;
</script>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    {#each breadcrumbs as item (item.url)}
      {#if !item.isCurrent}
        <li class="breadcrumb-item">
          <a href={item.url} use:link>{item.label}</a>
        </li>
      {:else}
        <!-- svelte-ignore a11y-missing-attribute -->
        <li class="breadcrumb-item active" aria-current="page">
          <a>{item.label}</a>
        </li>
      {/if}
    {/each}
  </ol>
</nav>
