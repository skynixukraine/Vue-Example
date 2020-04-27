<template>
    <div class="page">
            <div class = "section kontakt-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}">
            <div class = "container container__mobile-adaptation">
                <h1 class ="title">Kontaktformular</h1>
                <h3 class ="subtext">
                    Senden Sie uns hier Ihre Anfrage:
                </h3>
            </div>
            </div>
            <div class="container">
                <KontaktContent />
            </div>
        </div>
</template>

<script>
import KontaktContent from "~/components/Kontakt/KontaktContent"

export default {
    head(){
            return {title : this.$t("page-kontakt.head.title")}
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
    components  : {
        KontaktContent
    }
}
</script>