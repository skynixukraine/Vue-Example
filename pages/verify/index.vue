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
    beforeCreate() {
        setTimeout(() => {
            this.$store.dispatch('user/AUTOLOGIN_USER', { token: this.$store.getters['user/TOKEN'], user: this.$store.getters['user/USER'] })
        }, 0)
    },

    components: {
        VerifyEmail,
    }
}
</script>