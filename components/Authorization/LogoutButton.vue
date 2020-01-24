<template>
    <button class="link link--button link--button-transparent" @click="onLogout">Logout</button>
</template>

<script>
export default {
    methods: {
        onLogout() {
            this.$store.dispatch('user/LOGOUT_USER', this.$cookies.get(this.$cookie.names.token))
                .then(response => {
                    this.removeUserCookie()
                    this.$router.push({ path: this.$routes.home.path })
                })
        },

        removeUserCookie() {
            this.$cookies.remove(this.$cookie.names.token)
            this.$cookies.remove(this.$cookie.names.tokenId)
        }
    }
}
</script>