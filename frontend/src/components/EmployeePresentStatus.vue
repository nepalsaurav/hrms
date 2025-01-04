<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { client } from "@/api/pocketbase";
import { isEmployeePresent } from "@/utils";
const props = defineProps({
    item: Object,
    header: Object,
});
const presentStatus = ref("");
onMounted(async () => {
    const setting = await client.send("/api/get_settings/attendance.json", {
        $autoCancel: false,
    });
    const status = isEmployeePresent(
        setting.check_in_time.value,
        setting.check_out_time.value,
        props.item.check_in_time,
        props.item.check_out_time,
    );
    presentStatus.value = status;
});
console.log(presentStatus.value);
</script>

<template>
    <span
        :class="`tag ${presentStatus === 'Absent' ? 'is-danger' : 'is-success'}`"
        >{{ presentStatus }}</span
    >
</template>
