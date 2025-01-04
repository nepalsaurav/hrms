<script setup>
import Swal from "sweetalert2";
import { client } from "@/api/pocketbase";
const props = defineProps({
    item: Object,
    header: Object,
    reloadData: Function,
});
async function handleClick(item, condition) {
    const prompt = await Swal.fire({
        title: `Are you sure want to ${condition}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#171717",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${condition} it!`,
    });
    if (!prompt.isConfirmed) return;
    if (props.header.collection === "check_in") {
        if (props.item.check_in_time === "") {
            Swal.fire({
                title: "Error!",
                text: "please! check in first",
                icon: "error",
            });
            return;
        }
        if (props.item.check_out_time === "") {
            Swal.fire({
                title: "Error!",
                text: "please! check out first",
                icon: "error",
            });
            return;
        }
    }
    try {
        client.collection(props.header.collection).update(props.item.id, {
            status: condition,
        });
    } catch (err) {
        Swal.fire({
            title: "Error!",
            text: err.data.message,
            icon: "error",
        });
    } finally {
        Swal.fire({
            title: "Success!",
            text: "successfully updated",
            icon: "success",
        });
        if (props.reloadData !== undefined) {
            props.reloadData();
        }
    }
}
</script>

<template>
    <span>
        <button
            class="button is-success is-small"
            @click="handleClick(props.item, 'accepted')"
        >
            Accept
        </button>
        <button
            class="button is-danger is-small ml-2"
            @click="handleClick(props.item, 'rejected')"
        >
            Reject
        </button>
    </span>
</template>
