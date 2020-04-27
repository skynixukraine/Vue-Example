<template>
    <div class="page">
         <div class = "section impressum-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}"
        >
            <div class = "container container__mobile-adaptation">
                <h1 class ="title">Impressum</h1>

                <h3 class ="subtext">
                    Smart Health Heidelberg GmbH<br>
                    Handschuhsheimer Landstr. 9/1<br>
                    69120 Heidelberg<br>
                    Deutschland<br>
                    hello@smarthealth.de<br>
                    +49 6221 3219304 (Kein Telefon-Support)
                </h3>
                <h3 class ="subtext">
                    Vertreten durch: Dr. med. Titus J. Brinker<br>
                    Registergericht Mannheim, HRB 729089<br>
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Dr. med. Titus J. Brinker
                </h3>
            </div>
        </div>
        <div class="container">
            <ImpressumContent />
        </div>
    </div>
</template>

<script>

import ImpressumContent from "~/components/Static/ImpressumContent"

export default {
    head(){
            return {title : this.$t("page-impressum.head.title")}
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
    components : {
        ImpressumContent
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
    .impressum-section{
        margin: 0 0 32px 0;
        padding: 0;

        @include tablet-big{
            margin: 0 0 60px 0;
        }
    }
</style>