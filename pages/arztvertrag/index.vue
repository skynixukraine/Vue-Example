<template>
    <div class="page">
        <div class="section vorteile-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}">
            <div class = "container container__mobile-adaptation">
                <h2 class="title">{{ this.$t('arztvertrag-page.title') }}</h2>
            </div>
        </div>
            <div class="container arztvertrag-page">
                <ArztvertragContent />
            </div>
        
    </div>
</template>

<script>
    import ArztvertragContent from "~/components/Static/ArztvertragContent"
    
export default {
    components : {
        ArztvertragContent
    },
    head(){
            return {title : "Arztvertrag zur Regelung der Zusammenarbeit bzgl"}
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