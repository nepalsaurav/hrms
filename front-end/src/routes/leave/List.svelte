<script>
  import { link } from "svelte-spa-router";
  import { isLoading, listResponse } from "../../store/list";
  import SearchForm from "../../layout/SearchForm.svelte";
  import { querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
  import PageInfo from "../../layout/PageInfo.svelte";

  /**
   * @param {RequestInfo | URL} [url]
   */
  async function fetchData(url) {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      $listResponse = data;
      $isLoading = false;
    } catch {}
  }

  onMount(() => {
    fetchData("/api/leave");
  });

  $: {
    if ($querystring === "") {
      fetchData("/api/leave");
    } else {
      fetchData(`/api/leave?${$querystring}`);
    }
  }
</script>

<h1>leave list page</h1>

<a href="/leave/add" use:link>Add leave</a>

<SearchForm />

{#if $isLoading}
  <!-- content here -->
  <p>true</p>
{:else if $listResponse}
  {#if $listResponse.tableData.length === 0}
    <!-- content here -->
    <p>no data found</p>
  {:else}
    <PageInfo />
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>username</th>
          <th>name</th>
          <th>start date</th>
          <th>end date</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {#each $listResponse.tableData as item, i (item.id)}
          <tr>
            <td>{item.username}</td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.start_date}</td>
            <td>{item.end_date}</td>
            {#if item.status === "pending"}
              <td><span class="badge bg-warning text-muted">pending</span></td>
            {:else if item.status === "approved"}
              <td><span class="badge bg-success text-muted">approved</span></td>
            {:else}
              <td><span class="badge bg-danger text-muted">reject</span></td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- else content here -->
  {/if}
{/if}

<style>
  .table thead tr th {
    text-transform: uppercase;
  }
</style>
