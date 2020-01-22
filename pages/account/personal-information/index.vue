<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <h1>Personal Information</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async fetch ({ app, store, error }) {
        // if token exist and user empty - load User object        
        if (app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null) {
            await store.dispatch('user/LOAD_USER', {
                id: app.$cookies.get(app.cookie.names.tokenId),
                token: app.$cookies.get(app.cookie.names.token)
            })
        }
    },
}
</script>