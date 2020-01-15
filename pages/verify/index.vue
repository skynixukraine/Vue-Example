<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <VerifyEmail />
            </div>
        </div>
    </div>
</template>

<script>
import VerifyEmail from "~/components/Authorization/VerifyEmail"

export default {
    // async fetch ({ store, error }) {
    //     await store.dispatch('user/AUTOLOGIN_USER', { token: store.getters['user/TOKEN'], user: store.getters['user/USER'] })        
    // },

    components: {
        VerifyEmail,
    }
}
</script>