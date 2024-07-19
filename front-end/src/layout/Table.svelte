<script>
  import { location, push, querystring } from "svelte-spa-router";
  import { isLoading, listResponse } from "../store/list";
  import { customFetch } from "../utils/custo_fetch";
  import Skeleton from "../components/Skeleton.svelte";
  import PageInfo from "./PageInfo.svelte";
  import Pagination from "./Pagination.svelte";

  export let apiURL;
  export let tableColumns;

  /**
   * @param {RequestInfo | URL} [url]
   */
  async function fetchData(url) {
    try {
      $isLoading = true;
      const data = await customFetch((url = url));
      if (data.type === "json") {
        $listResponse = data.data;
        $isLoading = false;
      }
    } catch {}
  }

  $: {
    if ($querystring === "") {
      fetchData(apiURL);
    } else {
      fetchData(`${apiURL}?${$querystring}`);
    }
  }

  /**
   * @param {string} name
   */
  async function orderBy(name) {
    const searchParams = new URLSearchParams($querystring);
    if ($listResponse.pageInfo.orderBy === name) {
      searchParams.set("order_by", `-${name}`);
    } else {
      searchParams.set("order_by", name);
    }
    push(`${$location}?${searchParams.toString()}`);
  }
</script>

{#if $isLoading}
  <!-- content here -->
  <Skeleton />
{:else if $listResponse}
  {#if $listResponse.tableData.length === 0}
    <!-- content here -->
    <p>no data found</p>
  {:else}
    <PageInfo />
    <table class="table table-bordered">
      <thead>
        <tr>
          {#each tableColumns as col}
            {#if col.orderBy}
              <th
                class="text-uppercase text-muted"
                on:click={() => orderBy(col.orderName)}
              >
                {col.label}
                {#if $listResponse.pageInfo.orderBy === col.orderName}
                  <i class="fa-solid fa-sort-up"></i>
                {/if}
                {#if $listResponse.pageInfo.orderBy === `-${col.orderName}`}
                  <i class="fa-solid fa-sort-down"></i>
                {/if}
              </th>
            {:else}
              <th class="text-uppercase text-muted">{col.label}</th>
            {/if}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $listResponse.tableData as item, i (item.id)}
          <tr>
            {#each tableColumns as col}
              {#if col.slot}
                <td>
                  <slot {col} {item}></slot>
                </td>
                <!-- content here -->
              {:else}
                <td>{item[col.name]}</td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    <Pagination />
  {/if}
{/if}
