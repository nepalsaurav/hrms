<script>
  import { link } from "svelte-spa-router";
  import SearchForm from "../../layout/SearchForm.svelte";
  import BreadCrumbs from "../../components/nav/BreadCrumbs.svelte";
  import Table from "../../layout/Table.svelte";

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

  const apiURL = "/api/leave";
  const tableColumns = [
    {
      name: "username",
      label: "USERNAME",
      orderBy: true,
      orderName: "user",
    },
    {
      name: "first_name",
      label: "FIRST NAME",
    },
    {
      name: "start_date",
      label: "START DATE",
      orderBy: true,
      orderName: "start_date",
    },
    {
      name: "end_date",
      label: "END DATE",
      orderBy: true,
      orderName: "end_date",
    },
    {
      name: "status",
      label: "STATUS",
      orderBy: true,
      orderName: "status",
      slot: true,
    },
  ];
</script>

<BreadCrumbs {breadcrumbs} />

<div class="d-flex mb-2 flex-row-reverse">
  <a href="/leave/add" class="btn btn-primary" use:link>
    <i class="fa-solid fa-plus"></i>
    Add Leave
  </a>
</div>

<SearchForm />

<Table {apiURL} {tableColumns} let:col let:item>
  {#if col.name === "status"}
    {#if item.status === "pending"}
      <span class="badge bg-warning text-muted">pending</span>
    {:else if item.status === "approved"}
      <span class="badge bg-success text-muted">approved</span>
    {:else}
      <span class="badge bg-danger text-muted">reject</span>
    {/if}
  {/if}
</Table>
