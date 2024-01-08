<aside class="sticky__sidebar">
    <ul class="nav flex-column">
        <li class="nav-item">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a class="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li class="nav-item">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
    </ul>
</aside>

<style>
    .sticky__sidebar {
        position: sticky;
        top: 5rem;
        display: block !important;
        height: calc(100vh - 6rem);
        padding-left: 0.25rem;
        margin-left: -0.25rem;
        overflow-y: auto;
    }
</style>
