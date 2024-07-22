<script>
  import { listResponse } from "../store/list";
  import { location, push, querystring } from "svelte-spa-router";

  /**
   * @param {number} page
   */
  async function goToPage(page) {
    const searchParams = new URLSearchParams($querystring);
    searchParams.set("page", String(page));
    push(`${$location}?${searchParams.toString()}`);
  }

  const pageRange = 3;
  function getPages() {
    const pages = [];
    for (
      let i = Math.max(1, $listResponse.currentPage - pageRange);
      i <=
      Math.min($listResponse.totalPages, $listResponse.currentPage + pageRange);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  }
  console.log(getPages());
</script>

{#if $listResponse.totalPages > 1}
  <nav aria-label="Page navigation example mt-2">
    <ul class="pagination justify-content-center">
      {#if $listResponse.hasPrevious}
        <li class="page-item">
          <button
            class="page-link"
            on:click={() => {
              goToPage($listResponse.currentPage - 1);
            }}>Previous</button
          >
        </li>
      {:else}
        <li class="page-item disabled">
          <button class="page-link">Previous</button>
        </li>
      {/if}

      {#if $listResponse.currentPage > pageRange + 1}
        <li class="page-item">
          <button class="page-link" on:click={() => goToPage(1)}> 1 </button>
        </li>
        {#if $listResponse.currentPage > pageRange + 2}
          <li class="page-item disabled">
            <span class="page-link">...</span>
          </li>
        {/if}
      {/if}

      {#each getPages() as page}
        <li
          class="page-item {$listResponse.currentPage === page ? 'active' : ''}"
        >
          <button class="page-link" on:click={() => goToPage(page)}>
            {page}
          </button>
        </li>
      {/each}

      {#if $listResponse.currentPage < $listResponse.totalPages - pageRange}
        {#if $listResponse.currentPage < $listResponse.totalPages - pageRange - 1}
          <li class="page-item disabled">
            <span class="page-link">...</span>
          </li>
        {/if}
        <li class="page-item">
          <button
            class="page-link"
            on:click={() => goToPage($listResponse.totalPages)}
          >
            {$listResponse.totalPages}
          </button>
        </li>
      {/if}

      {#if $listResponse.hasNext}
        <li class="page-item">
          <button
            class="page-link"
            on:click={() => {
              goToPage($listResponse.currentPage + 1);
            }}>Next</button
          >
        </li>
      {:else}
        <li class="page-item disabled">
          <button class="page-link">Next</button>
        </li>
      {/if}
    </ul>
  </nav>
{/if}
