<script setup>
const props = defineProps({
    item: Object,
    header: Object,
});
</script>
<template>
    <span class="tag is-success" v-if="props.item.status === 'present'">
        Present
    </span>
    <span class="tag is-info" v-if="props.item.status === 'wo'">
        Weekly off
    </span>
    <span class="tag is-warning" v-if="props.item.status === 'holiday'">
        Holiday
    </span>
    <span class="tag is-warning" v-if="props.item.status === 'pending'">
        Pending
    </span>
    <span class="tag is-success" v-if="props.item.status === 'accepted'">
        Accepted
    </span>
    <span class="tag is-danger" v-if="props.item.status === 'rejected'">
        Rejected
    </span>
    <span class="tag is-danger" v-if="props.item.status === 'absent'">
        Absent
    </span>
</template>
