import { defineStore } from "pinia";
import { ref } from "vue";
import { client } from "./pocketbase";



export const useAuthStore = defineStore('useAuthStore', () => {
  const currentUser = ref(client.authStore.record);
  const loading = ref(true)

  function changeCurrentUser(model) {
    currentUser.value = model;
  }

  async function getUserDetail() {

    if (currentUser.value) {
      try {
        const record = await client.collection("employee").getOne(currentUser.value.employee, {
          expand: "roles,leave_type"
        })

        return record

      } catch (error) {
        console.log(error)
        return null
      }
    }
    return null
  }

  return {
    currentUser,
    changeCurrentUser,
    getUserDetail,
    loading
  };
});
