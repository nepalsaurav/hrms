<script>
  import { onMount } from "svelte";
  import { customFetch } from "../utils/custo_fetch";
  import Skeleton from "../components/Skeleton.svelte";

  export let params = {};

  let item = null;
  let loading = false;
  let error = null;

  export let viewTitle;
  export let viewData;

  async function getSingleViewData() {
    try {
      const fetchData = await customFetch(`/api/leave/${params.id}`);
      if (fetchData.type === "json") {
        item = fetchData.data.data[0];
      } else {
        error = "something error occured";
      }
    } catch {
      error = "something error occured";
    }
  }

  onMount(() => {
    getSingleViewData();
  });
</script>

{#if loading}
  <Skeleton />
{:else if error != null}
  <p class="text-muted">{@html error}</p>
{:else if item != null}
  <div class="card">
    <div class="card-header text-muted text-uppercase">{item[viewTitle]}</div>
    <div class="card-body">
      {#each viewData as col}
        {#if col.slot}
          <slot {col} {item}></slot>
          <!-- content here -->
        {:else}
          <p class="text-muted">{col.label}: {item[col.name]}</p>
        {/if}
      {/each}
    </div>
  </div>
{/if}
