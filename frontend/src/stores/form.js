import { ref } from "vue";
import { defineStore } from "pinia";

export const useFormModel = defineStore('useFormModel', () => {
      const formModel = ref({});
      function resetForm() {
        formModel.value = {}
      }
      return {
        formModel,
        resetForm
      }
})

