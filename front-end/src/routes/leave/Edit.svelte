<script>
  import BreadCrumbs from "../../components/nav/BreadCrumbs.svelte";
  import AddForm from "../../layout/AddForm.svelte";

  export let params = {};

  const formUrl = `/api/leave/edit/${params.id}/`;
  const redirectSuccessURL = "/leave";
  const formTitle = "Edit Leave";

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
      url: "/leave/edit/",
      label: "Edit",
      isCurrent: true,
    },
  ];
</script>

<BreadCrumbs {breadcrumbs} />
<AddForm {formUrl} {redirectSuccessURL} {formTitle} />
