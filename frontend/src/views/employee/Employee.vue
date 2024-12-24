<script setup>
import { RouterLink } from 'vue-router';
</script>


<template>
    <div class="is-flex is-flex-direction-row-reverse">
        <RouterLink to="/employee/add" class="button is-dark">
            <i class="bi bi-plus-circle px-1"></i>Add Employee
        </RouterLink>
    </div>
</template>