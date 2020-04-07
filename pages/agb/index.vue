<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <h1>AGB</h1>
                <AgbContent />
            </div>
        </div>
    </div>
</template>

<script>
    import AgbContent from "~/components/Static/AgbContent"
    
export default {
    components : {
        AgbContent
    },
    head(){
            return {title : this.$t("page-agb.head.title")}
        },
    async fetch ({ app, store, error }) {
        // if token exist and user empty - load User object        
        if (app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null) {
            await store.dispatch('user/LOAD_USER', { id: app.$cookies.get(app.cookie.names.tokenId), token: app.$cookies.get(app.cookie.names.token) })
                .catch(error => {
                    app.$cookies.remove(app.cookie.names.token)
                    app.$cookies.remove(app.cookie.names.tokenId)
                })
        }
    },
}
</script>