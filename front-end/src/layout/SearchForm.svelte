<script>
  import { push } from "svelte-spa-router";
  import { listResponse } from "../store/list";
  import { location, querystring } from "svelte-spa-router";
  async function handleSearchFormSubmit(e) {
    const form = new FormData(e.target);
    const searchParams = new URLSearchParams();
    for (const [key, value] of form.entries()) {
      if (value != "" && typeof value === "string") {
        searchParams.set(key, value);
      }
    }

    if (searchParams.toString() != "") {
      searchParams.delete("page");
      push(`${$location}?${searchParams.toString()}`);
    }
  }

  async function handleReset() {
    push($location);
  }
</script>

{#if $listResponse}
  <!-- content here -->
  <div class="card mb-3">
    <div class="card-header">Search</div>
    <div class="card-body">
      <form on:submit|preventDefault={handleSearchFormSubmit}>
        <fieldset>
          {@html $listResponse.results.searchForm}
          <input type="submit" value="Search" class="btn btn-primary" />
          <input
            type="reset"
            value="Reset"
            on:click={handleReset}
            class="btn btn-secondary ms-2"
          />
        </fieldset>
      </form>
    </div>
  </div>
{/if}
