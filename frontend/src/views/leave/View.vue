<script setup lang="jsx">
import DetailView from "@/components/DetailView.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
import FullNameComponent from "@/components/FullNameComponent.vue";
import Status from "@/components/Status.vue";

const route = useRoute();

const breadcrumbLink = ref([
    {
        label: "Dashboard",
        path: "/",
        isActive: false,
    },
    {
        label: "Leave",
        path: "/leave",
        isActive: false,
    },
    {
        label: "View",
        path: `/leave/view/${route.params.id}`,
        isActive: true,
    },
]);

const viewList = [
    {
        name: "full_name",
        label: "Full Name",
        type: "text_component",
        component: FullNameComponent,
        fields: ["first_name", "middle_name", "last_name"],
        collection: "employee",
    },
    {
        name: "leave_from",
        label: "Leave From",
        type: "date",
    },
    {
        name: "leave_to",
        label: "Leave To",
        type: "date",
    },
    {
        name: "status",
        label: "Status",
        type: "text_component",
        component: Status,
    },
    {
        name: "reasons",
        label: "Reasons",
        type: "rich_text",
    },
];
</script>

<template>
   <div class="container">
    <DetailView
        collection="leave"
        :breadcrumb="breadcrumbLink"
        :viewList="viewList"
        expand="employee"
    />
   </div>
</template>
