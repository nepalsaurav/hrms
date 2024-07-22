<script>
  import { listResponse } from "../store/list";
  import { push, location, querystring } from "svelte-spa-router";
  async function handleRowPerChange(e) {
    const target = e.target;
    const selectedPerPage = target.options[target.selectedIndex].value;
    const searchParams = new URLSearchParams();
    searchParams.set("page_size", selectedPerPage);
    push(`${$location}?${searchParams.toString()}`);
  }
  console.log($listResponse.pageSize);
</script>

<div class="d-inline-flex mb-3 mt-2">
  <div>
    <p class="text-muted">
      page {$listResponse.currentPage} of {$listResponse.totalPages} [showing {$listResponse.startIndex}
      - {$listResponse.endIndex} of {$listResponse.count} records]
    </p>
  </div>
  <div class="d-inline-flex align-self-center ms-4">
    <p class="text-muted">row per page</p>
    <select
      class="form-select ms-2"
      aria-label="Default select example"
      style="width: fit-content;height:fit-content"
      on:change={handleRowPerChange}
    >
      {#each Array.from([10, 20, 40, 50]) as item}
        <option selected={$listResponse.pageSize === item} value={item}
          >{item}</option
        >
      {/each}
    </select>
  </div>
</div>
