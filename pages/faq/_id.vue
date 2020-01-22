<template>
    <div class="page">
        <div class="section section--32-32">
            <div class="container">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
        <div class="section">
            <div class="container">
                <h1>ID: {{ $route.params.id }}</h1>
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
    
    data() {
        return {
            breadcrumbs: [{
                text: this.$t('links.home'),
                to: this.$routes.home.path
            },{
                text: this.$t('links.faq'),
                to: this.$routes.faq.path
            },{
                text: this.$route.params.id,
            }],
        }
    }
}
</script>