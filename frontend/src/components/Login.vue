<script setup>
    import {ref} from "vue";
    import { client } from "@/api/pocketbase";
    const error = ref(null)

    async function handleSubmit(event) {
        error.value = null
        const form = new FormData(event.target);
        try {
            const record = await client.collection("users").authWithPassword(form.get("email"), form.get("password"))
            console.log(record)
        } catch(err) {
            console.log(err)
        }
    }
</script>

<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <div class="box p-6 mb-0">
                        <p class="is-size-4 has-text-weight-bold has-text-white pb-5">Please login to proceed</p>
                        <form novalidate @submit.prevent="handleSubmit" >
                            <p class="has-text-danger mb-2" v-if="error !== null">{{ error }}</p>
                            <div class="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input class="input is-medium" name="email" type="email" placeholder="Email" />
                                    <span class="icon is-medium is-left">
                                        <i class="bi bi-envelope"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input is-medium" name="password" type="password" placeholder="Password" />
                                    <span class="icon is-small is-left">
                                        <i class="bi bi-shield-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div class="column is-flex is-half is-offset-one-quarter">
                                <button class="button is-block is-dark  is-medium ">
                                    Login
                                </button>
                            </div>

                            <!-- <p class="subtitle is-5 mb-3">Login using Social Media</p>
                            <div class="buttons is-centered">
                                <a class="button is-medium is-facebook" href="https://facebook.com"
                                    aria-label="Login with Facebook">
                                    <span class="icon">
                                        <i class="fab fa-facebook-f fa-lg"></i>
                                    </span>
                                </a>
                                <a class="button is-medium is-twitter" href="https://twitter.com"
                                    aria-label="Login with Twitter">
                                    <span class="icon">
                                        <i class="fab fa-twitter fa-lg"></i>
                                    </span>
                                </a>
                                <a class="button is-medium is-github" href="https://github.com/aldi"
                                    aria-label="Login with GitHub">
                                    <span class="icon">
                                        <i class="fab fa-github fa-lg"></i>
                                    </span>
                                </a>
                            </div> -->

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    overflow-y: hidden;
    background: url('https://images.unsplash.com/3/GoWildImages_MtEverest_NEP0555.jpg?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat;
}

.box {
    margin-top: 5rem;
    width: 25rem;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>