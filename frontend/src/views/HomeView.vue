<script setup>
import BirthdayInfo from '@/components/Dashboard/BirthdayInfo.vue';
import LeaveSummary from '@/components/Dashboard/LeaveSummary.vue';
import { useStorage } from '@vueuse/core';

const employee = JSON.parse(useStorage("employee").value)

</script>

<template>
  <main>
    <div class="columns">

      <!-- leave summary -->
      <div class="column">
        <div class="card" style="width: 32rem;">
          <div class="card-content">
            <LeaveSummary v-if="employee" :employee="employee" />
          </div>
        </div>
      </div>
      <!-- leave summary -->
      <!-- birthday info -->
      <div class="column">
        <div class="card" style="width: 32rem;">
          <div class="card-content">
            <BirthdayInfo />
          </div>
        </div>
      </div>
      <!-- birthday info -->
    </div>
  </main>
</template>
