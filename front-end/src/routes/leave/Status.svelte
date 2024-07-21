<script>
  export let item;
</script>

{#if item.status === "pending"}
  <span class="badge bg-warning text-muted">pending</span>
{:else if item.status === "approved"}
  <span class="badge bg-success text-muted">approved</span>
{:else}
  <span class="badge bg-danger text-muted">reject</span>
{/if}
