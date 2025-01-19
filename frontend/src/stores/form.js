import { ref } from "vue";
import { defineStore } from "pinia";


export const useFormModel = defineStore('useFormModel', () => {
  const formModel = ref({});
  function resetForm() {
    formModel.value = {}
  }
  function getForm() {
    const form = new FormData()
    for (const [key, value] of Object.entries(formModel.value)) {
      if (value !== undefined && value !== "" && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            value.forEach(e => form.append(key, e))
          }
        } else {
          form.append(key, value)
        }
      }
    }
    return form
  }
  function trimObject() {
    const data = {}
    for (const [key, value] of Object.entries(formModel.value)) {
      if (value !== undefined && value !== "" && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            data[key] = value
          }
        } else {
          data[key] = value
        }
      }
    }
    return data
  }
  return {
    formModel,
    getForm,
    trimObject,
    resetForm
  }
})

