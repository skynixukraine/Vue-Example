<template>
    <div class="page page--home page--without-padding">
        <div class="section section--fullscreen" :style="{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-2.jpg')})` }">
            <div class="container">
                <HeroBanner />
            </div>
            <div class="section-scroll-tooltip"><div class="section-scroll-tooltip__inner">{{ $t('banners.herobanner.scroll-to-run') }}</div></div>
        </div>
        <div class="section section--bg-left-2">
            <div class="container">
                <img class="container__dots container__dots--3" :src="require('~/static/images/images/dots-squere.png')" alt="dots">
                <header class="section-header">
                    <h2 class="section-header__title">{{ $t('headers.few-steps') }}</h2>
                </header>
                <ul class="list">
                    <li class="list__item" v-for="(step, index) in steps" :key="index" style="margin: 0;">
                         <StepCard :step="step" />
                    </li>
                </ul>
                <footer class="section-footer">
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-gradient" exact>{{ $t('links.frequently-asked') }}</NuxtLink>
                </footer>
            </div>
        </div>
        <div class="section section--64" :style="{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-1.jpg')})` }" style="position:relative;z-index:1;">
            <div class="container">
                <header class="section-header">
                    <h2 class="section-header__title section-header__title--white">{{ $t('headers.your-advantages') }}</h2>
                </header>
                <ul class="list list--d4">
                    <li class="list__item" v-for="(advantage, index) in advantages" :key="index">
                         <AdvantageCard :advantage="advantage" />
                    </li>
                </ul>
                <footer class="section-footer">
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-white" exact>{{ $t('links.further-information') }}</NuxtLink>
                </footer>
            </div>
        </div>
        <!-- <div class="section section--bg-right-1">
            <div class="container">
                <header class="section-header">
                    <h2 class="section-header__title">{{ $t('headers.our-family-doctors') }}</h2>
                </header>
                <ul class="list list--d3">
                    <li class="list__item" v-for="(user, index) in users" :key="index">
                         <DoctorCard :doctor="user" />
                    </li>
                </ul>
                <footer class="section-footer">
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-blue" exact>{{ $t('links.show-all') }}</NuxtLink>
                </footer>
            </div>
        </div> -->
        <div class="section section--without-paddings">
            <div class="container">
                <img class="container__dots container__dots--1" :src="require('~/static/images/images/dots-squere.png')" alt="dots">
                <RequestBanner />
            </div>
        </div>
        <div class="section">
            <div class="container">
                <img class="container__dots container__dots--2" :src="require('~/static/images/images/dots-squere.png')" alt="dots">
                <WhyInfo />
            </div>
        </div>
        <div class="section section--0-default">
            <div class="container">
                <DiseasesInfo />
            </div>
        </div>
    </div>
</template>

<script>
import HeroBanner from "~/components/Banners/HeroBanner"
import DoctorCard from "~/components/Cards/DoctorCard"
import AdvantageCard from "~/components/Cards/AdvantageCard"
import StepCard from "~/components/Cards/StepCard"
import LogoCard from "~/components/Cards/LogoCard"
import RequestBanner from "~/components/Banners/RequestBanner"
import WhyInfo from "~/components/Content/WhyInfo"
import DiseasesInfo from "~/components/Content/DiseasesInfo"

export default {
    head() {
        return { title: this.$t('page-home.head.title') }
    },
    async fetch ({ store, error }) {

        if (!store.getters['user/USERS'].length) {
            const users = await store.dispatch('user/LOAD_USERS').catch((e) => {
                error({ statusCode: e.status, message: e.message })
            })
            store.commit('user/SET_USERS', users)
        }
        
    },

    mounted() {
        this.$root.$emit('showNotify', { type: 'success', text: 'Home page is mounted.' })
        this.$modal.show('register-success', { foo: 'bar' })
    },

    data() {
        return {
            breadcrumbs: [{
                text: this.$t('links.home'),
                to: this.$routes.home.path
            }],
            advantages: [{
                icon: require('~/static/images/advantages/loupe.svg'),
                text: this.$t('advantages.independent-accessible')
            },{
                icon: require('~/static/images/advantages/clock.svg'),
                text: this.$t('advantages.fast-time-saving')
            },{
                icon: require('~/static/images/advantages/shield.svg'),
                text: this.$t('advantages.data-protection-compliant')
            },{
                icon: require('~/static/images/advantages/diamond.svg'),
                text: this.$t('advantages.professional-trustworthy')
            }],
            steps: [{
                number: '01',
                title: this.$t('steps.choose-dermatologist'),
                text: this.$t('steps.dermatologist-at-clinic-essen')
            },{
                number: '02',
                title: this.$t('steps.describe-symptoms'),
                text: this.$t('steps.what-complaints-problem')
            },{
                number: '03',
                title: this.$t('steps.you-get-specialist-advice'),
                text: this.$t('steps.specialist-initial-assessment')
            }],
        }
    },
    computed: {
        users() {
            return this.$store.getters['user/USERS']
        }
    },

    components: {
        HeroBanner,
        DoctorCard,
        AdvantageCard,
        StepCard,
        LogoCard,
        RequestBanner,
        WhyInfo,
        DiseasesInfo,
    }
}
</script>