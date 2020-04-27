<template>
    <div class="page">
        <div class="section vorteile-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}">
            <div class = "container container__mobile-adaptation agb-page">
                <h2 class="title">Allgemeine Geschäftsbedingungen</h2>
            </div>
        </div>
            <div class="container">
                <AgbContent />
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
<style lang = "scss" scoped>
    .container__mobile-adaptation.agb-page {
        .title {
            font-family: $TheAntiquaB;
            font-size: 30px;
            @include tablet {
                font-size: 48px;
            }
        }
    }
    </style>