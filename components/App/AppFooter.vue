<template>
    <footer class="app-footer">

        <div class="app-footer__section">
            <Container>
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
            </Container>
        </div>

        <div class="app-footer__section">
            <Container>
                <div class="app-footer__copyright">{{ $t('phrases.copyright') }}</div>
            </Container>
        </div>

    </footer>
</template>

<script>
export default {
    data() {
        return {
            links: {
                forPatients: [{
                    text: this.$t('links.send-case'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.advantages'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.frequently-questions'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.skin-lexicon'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.via-online-dermatologist'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.contact-form'),
                    to: this.$routes.home.path
                }],
                forDermatologists: [{
                    text: this.$t('links.participate'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.about-teledermatology'),
                    to: this.$routes.home.path
                }],
                research: [{
                    text: this.$t('links.project-group-studies'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.scientific-advisory-board'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.general-teledermatology'),
                    to: this.$routes.home.path
                }],
                formal: [{
                    text: this.$t('links.imprint'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.data-protection'),
                    to: this.$routes.home.path
                },{
                    text: this.$t('links.terms-of-service'),
                    to: this.$routes.home.path
                }],
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.app-footer {
    color: rgba(255, 255, 255, 0.44);

    &__link {
        color: rgba(255, 255, 255, 0.6);

        &:hover {
            color: rgba(255, 255, 255, 0.88);
        }
    }

    &__section {

        &:first-child {
            background: linear-gradient(180deg, #0F44B2 0%, #042052 100%);
            padding: 64px 0;
        }

        &:last-child {
            background: #001A4B;
            padding: 26px 0 22px;
        }
    }

    &__row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__column {
        width: 50%;
        margin-bottom: 32px;
    }

    &__title {
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
    }

    &__copyright {
        text-align: center;
        font-size: 15px;
        font-weight: 300;
    }


    @include tablet {

        &__column {
            width: 25%;
        }
    }
}
</style>