<script>
  import { link, push } from "svelte-spa-router";
  import { isLoading, listResponse } from "../../store/list";
  import SearchForm from "../../layout/SearchForm.svelte";
  import { location, querystring } from "svelte-spa-router";
  import PageInfo from "../../layout/PageInfo.svelte";
  import Skeleton from "../../components/Skeleton.svelte";
  import Pagination from "../../layout/Pagination.svelte";
  import { customFetch } from "../../utils/custo_fetch";
  import BreadCrumbs from "../../components/nav/BreadCrumbs.svelte";

  const breadcrumbs = [
    {
      url: "/",
      label: "Dashboard",
      isCurrent: false,
    },
    {
      url: "/leave/",
      label: "Leave",
      isCurrent: true,
    },
  ];

  /**
   * @param {RequestInfo | URL} [url]
   */
  async function fetchData(url) {
    try {
      $isLoading = true;
      const data = await customFetch((url = url));
      if (data.type === "json") {
        $listResponse = data.data;
        console.log($listResponse);
        $isLoading = false;
      }
    } catch {}
  }

  $: {
    if ($querystring === "") {
      fetchData("/api/leave");
    } else {
      fetchData(`/api/leave?${$querystring}`);
    }
  }

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

<BreadCrumbs {breadcrumbs} />
<div class="d-flex mb-2 flex-row-reverse">
  <a href="/leave/add" class="btn btn-primary" use:link>
    <i class="fa-solid fa-plus"></i>
    Add Leave
  </a>
</div>

<SearchForm />
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
          <th class="text-uppercase text-muted">S.N</th>
          <th
            class="text-uppercase text-muted"
            on:click={() => {
              orderBy("user");
            }}
          >
            username
            {#if $listResponse.pageInfo.orderBy === "user"}
              <i class="fa-solid fa-sort-up"></i>
            {/if}
            {#if $listResponse.pageInfo.orderBy === "-user"}
              <i class="fa-solid fa-sort-down"></i>
            {/if}
          </th>
          <th class="text-uppercase text-muted">name</th>
          <th
            class="text-uppercase text-muted"
            on:click={() => {
              orderBy("start_date");
            }}
          >
            start date
            {#if $listResponse.pageInfo.orderBy === "start_date"}
              <i class="fa-solid fa-sort-up"></i>
            {/if}
            {#if $listResponse.pageInfo.orderBy === "-start_date"}
              <i class="fa-solid fa-sort-down"></i>
            {/if}
          </th>
          <th
            class="text-uppercase text-muted"
            on:click={() => {
              orderBy("end_date");
            }}
          >
            end date
            {#if $listResponse.pageInfo.orderBy === "end_date"}
              <i class="fa-solid fa-sort-up"></i>
            {/if}
            {#if $listResponse.pageInfo.orderBy === "-end_date"}
              <i class="fa-solid fa-sort-down"></i>
            {/if}
          </th>
          <th class="text-uppercase text-muted">status</th>
        </tr>
      </thead>
      <tbody>
        {#each $listResponse.tableData as item, i (item.id)}
          <tr>
            <td>{$listResponse.pageInfo.startIndex + i}</td>
            <td>
              {item.username}
            </td>
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
    <Pagination />
  {/if}
{/if}
