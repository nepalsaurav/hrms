<script>
  import BreadCrumbs from "../../components/nav/BreadCrumbs.svelte";
  import AddForm from "../../layout/AddForm.svelte";

  const breadcrumbs = [
    {
      url: "/",
      label: "Dashboard",
      isCurrent: false,
    },
    {
      url: "/leave",
      label: "Leave",
      isCurrent: false,
    },
    {
      url: "/leave/add",
      label: "Add",
      isCurrent: true,
    },
  ];

  const formUrl = "/api/leave/add";
  const redirectSuccessURL = "/leave";
</script>

<main class="container">
  <BreadCrumbs {breadcrumbs} />
  <AddForm {formUrl} {redirectSuccessURL} />
</main>
