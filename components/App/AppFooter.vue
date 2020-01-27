<template>
    <footer class="app-footer">

        <div class="app-footer__section">
            <div class="container">
                <div class="app-footer__row">
                    <div class="app-footer__column">
                        <h4 class="app-footer__title">{{ $t('headers.for-patients') }}</h4>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.forPatients" :key="index">
                                <NuxtLink :to="link.to" class="app-footer__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="app-footer__column">
                        <h4 class="app-footer__title">{{ $t('headers.for-dermatologists') }}</h4>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.forDermatologists" :key="index">
                                <NuxtLink :to="link.to" class="app-footer__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="app-footer__column">
                        <h4 class="app-footer__title">{{ $t('headers.research') }}</h4>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.research" :key="index">
                                <NuxtLink :to="link.to" class="app-footer__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="app-footer__column">
                        <h4 class="app-footer__title">{{ $t('headers.formal') }}</h4>
                        <ul class="app-footer__list">
                            <li class="app-footer__item" v-for="(link, index) in links.formal" :key="index">
                                <NuxtLink :to="link.to" class="app-footer__link">{{ link.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="app-footer__section">
            <div class="container">
                <div class="app-footer__copyright">{{ $t('phrases.copyright') }}</div>
            </div>
        </div>

    </footer>
</template>

<script>
export default {
    data() {
        return {
            links: {
                forPatients: [{
                    text: 'Anfrage starten',
                    to: this.$routes.hautarzt.path
                },{
                    text: 'Hautärzte',
                    to: this.$routes.hautarzt.path
                },{
                    text: 'Ihre Vorteile',
                    to: this.$routes.vorteile.path
                },{
                    text: 'Häufige Fragen',
                    to: this.$routes.faq.path
                },{
                    text: 'Über Uns',
                    to: this.$routes.about.path
                },{
                    text: 'Kontakt',
                    to: this.$routes.contact.path
                }],

                forDermatologists: [{
                    text: 'Mitmachen bei Online Hautarzt',
                    to: this.$routes.registrierung.path
                },{
                    text: 'Teilnahmekonditionen',
                    to: this.$routes.konditionen.path
                },{
                    text: 'Login',
                    to: this.$routes.login.path
                }],

                research: [{
                    text: 'Abgeschlossene Studien',
                    to: this.$routes.studien.path
                },{
                    text: 'Laufende Studien',
                    to: this.$routes.forschung.path
                }],

                formal: [{
                    text: 'Datenschutzerklärung',
                    to: this.$routes.datenschutz.path
                },{
                    text: 'Allgemeine Geschäftsbedingungen',
                    to: this.$routes.agb.path
                },{
                    text: 'Impressum',
                    to: this.$routes.impressum.path
                }],
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.app-footer {
    color: $color-footer-text;

    &__link {
        color: $color-footer-link;

        &:hover {
            color: $color-footer-link-active;
        }
    }

    &__section {

        &:first-child {
            background: $color-gradient-blue-dark;
            padding: 48px 0;
            max-height: 565px;
            height: 565px
        }

        &:last-child {
            background: $color-stratos;
            padding: 26px 0 22px;
            max-height: 70px;
        }
    }

    &__row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__column {
        width: 50%;
        
        &:nth-child(1),
        &:nth-child(2) {
            margin-bottom: 32px;
        }
    }

    &__title {
        font-size: 18px;
        color: $color-white;
    }

    &__list {
        margin: 0;
        padding: 0 8px 0 0;
        list-style: none;
        font-size: 16px;
        line-height: 32px;
    }

    &__item {
        line-height: 1.4;
        margin-bottom: 10px;
        font-size: 15px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__copyright {
        text-align: center;
        font-size: 15px;
        font-weight: 300;
    }


    @include phone-big {

        &__item {
            font-size: 16px;
        }
    }


    @include tablet {

        &__column {
            width: 25%;

            &:nth-child(1),
            &:nth-child(2) {
                margin-bottom: 0;
            }
        }

        &__section {
            &:first-child {
                max-height: 364px;
                height: 364px;
            }

        &:last-child {
            max-height: 70px;
        }
    }

    }
}
</style>