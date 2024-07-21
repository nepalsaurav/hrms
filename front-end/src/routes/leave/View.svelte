<script>
  import BreadCrumbs from "../../components/nav/BreadCrumbs.svelte";
  import SingleView from "../../layout/SingleView.svelte";
  import Status from "./Status.svelte";
  export let params = {};

  const breadcrumbs = [
    {
      url: "/",
      label: "Dashboard",
      isCurrent: false,
    },
    {
      url: "/leave/",
      label: "Leave",
      isCurrent: false,
    },
    {
      url: "/leave/view/",
      label: "View",
      isCurrent: true,
    },
  ];
  const viewTitle = "username";
  const viewData = [
    {
      name: "first_name",
      label: "First Name",
    },
    {
      name: "last_name",
      label: "Last Name",
    },
    {
      name: "start_date",
      label: "Start Date",
    },
    {
      name: "end_date",
      label: "End Date",
    },
    {
      name: "leave_type",
      label: "leave Type",
    },
    {
      name: "status",
      label: "Status",
      slot: true,
    },
    {
      name: "reasons",
      label: "Reasons",
      slot: true,
    },
  ];
</script>

<BreadCrumbs {breadcrumbs} />

<SingleView {params} {viewTitle} {viewData} let:col let:item>
  {#if col.name === "status"}
    <p class="text-muted">{col.label}: <Status {item} /></p>
  {/if}

  {#if col.name === "reasons"}
    <p class="text-muted">{col.label}</p>
    <div class="card">
      <div class="card-body">
        {@html item[col.name]}
      </div>
    </div>
  {/if}
</SingleView>
