<script>
    import "../bootstrap.scss";
    import "./layout.scss";
    import NavBar from "$lib/components/navbar/NavBar.svelte";
    import SideBar from "$lib/components/sidebar/SideBar.svelte";
</script>

<NavBar />
<div class="container-fluid mt-4">
    <div class="d-flex flex-rows flex-nowrap">
        <SideBar />
        <div class="container">
            <slot />
        </div>
    </div>
</div>
