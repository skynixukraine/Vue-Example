<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <h1>Vorlagenen</h1>
                <p class="vorlagen-block__paragraph">
                {{this.$t('page-vorlagen.p1')}}<br>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head(){
            return {title : this.$t("page-vorlagen.head.title")}
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
<style lang = "scss">
.vorlagen-block{
        &__paragraph{
            margin-bottom: 20px;
        }
}
</style>