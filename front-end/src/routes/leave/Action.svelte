<script>
  import { link } from "svelte-spa-router";
  export let item;
</script>

<div class="dropdown">
  <button
    class="btn"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i class="fa-solid fa-ellipsis"></i>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Accept</a></li>
    <li>
      <a class="dropdown-item" use:link href="/leave/view/{item.id}">View</a>
    </li>
    <li>
      <a class="dropdown-item" use:link href="/leave/edit/{item.id}">Edit</a>
    </li>
  </ul>
</div>
