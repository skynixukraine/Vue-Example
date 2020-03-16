<template>
    <div class="page">
        <div class = "section vorteile-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-1.jpg')})`}"
        >
            <div class = "container container__mobile-adaptation">
                <h1 class ="title">Vorteile</h1>

                <h3 class ="subtext">
                    Der Online Hautarzt vor Ort ist nachhaltig gut für alle.
                </h3>
                <h3 class ="subtext">
                    Für Patienten, Hautärzte, Apotheker & gesunde Bürgerinnen und Bürger.
                </h3>
            </div>
        </div>
        <div class="container">
            <VorteileContent />
        </div>
    </div>
</template>

<script>
    import VorteileContent from "~/components/Static/VorteileContent"
export default {
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
    components : {
        VorteileContent
    }
}
</script>
<style lang = "scss">

    .title,
    .subtext{
        color: white;
    }
    .page{
        padding-top: 64px;

        @include tablet-big{
            padding-top: 68px;
        }
    }
    .vorteile-section{
        margin: 0 0 32px 0;
        padding: 0;

        @include tablet-big{
            margin: 0 0 60px 0;
        }
    }
</style>