<script setup>
   import { ref } from 'vue';
   import { onClickOutside } from '@vueuse/core'

   const active = ref(false);
   const target = ref()
   function handleActiveDropdown() {
      active.value = !active.value
   }

   onClickOutside(target, () => active.value = false)
</script>

<template>
    <div class="navbar-item has-dropdown mr-4" :class="active && 'is-active'" ref="target">
        <a class="navbar-link" @click="handleActiveDropdown">
            <slot name="label"></slot>
        </a>
        <Transition>
            <slot name="dropdown"></slot>
        </Transition>
    </div>
</template>