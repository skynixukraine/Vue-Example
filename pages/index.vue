<template>
    <div class="page page--home page--no-padding">
        <div class="section section--fullscreen" :style="{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-2.jpg')})` }">
            <div class="container">
                <HeroBanner />
            </div>
            <div class="section-scroll-tooltip"><div class="section-scroll-tooltip__inner">{{ $t('banners.herobanner.scroll-to-run') }}</div></div>
        </div>
        <div class="section section--default-0 section--bg-right-1">
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
        </div>
        <div class="section section--bg-left-2">
            <div class="container">
                <img class="container__dots container__dots--3" :src="require('~/static/images/images/dots-squere.png')" alt="dots">
                <header class="section-header">
                    <h2 class="section-header__title">{{ $t('headers.few-steps') }}</h2>
                </header>
                <ul class="list list__step--cards">
                    <li class="list__item" v-for="(step, index) in steps" :key="index" style="margin: 0;">
                         <StepCard :step="step" />
                    </li>
                </ul>
                <footer class="section-footer">
                    <NuxtLink :to="$routes.home.path" class="link link--button link--button-gradient" exact>{{ $t('links.frequently-asked') }}</NuxtLink>
                </footer>
            </div>
        </div>
        <div class="section section--64-64" :style="{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-1.jpg')})` }" style="position:relative;z-index:1;">
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
        <div class="section section--default-0">
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

    data() {
        return {
            breadcrumbs: [{
                text: this.$t('links.home'),
                to: this.$routes.home.path
            }],

            advantages: [{
                // icon: require('~/static/images/advantages/loupe.svg'),
                video: require('~/static/video/icons/01_icon.mp4'),
                text: this.$t('advantages.independent-accessible')
            },{
                // icon: require('~/static/images/advantages/clock.svg'),
                video: require('~/static/video/icons/02_icon.mp4'),
                text: this.$t('advantages.fast-time-saving')
            },{
                // icon: require('~/static/images/advantages/shield.svg'),
                video: require('~/static/video/icons/03_icon.mp4'),
                text: this.$t('advantages.data-protection-compliant')
            },{
                // icon: require('~/static/images/advantages/diamond.svg'),
                video: require('~/static/video/icons/04_icon.mp4'),
                text: this.$t('advantages.professional-trustworthy')
            }],

            steps: [{
                number: '01',
                video: require('~/static/video/icons/05_icon.mp4'),
                title: this.$t('steps.choose-dermatologist'),
                text: this.$t('steps.dermatologist-at-clinic-essen')
            },{
                number: '02',
                video: require('~/static/video/icons/06_icon.mp4'),
                title: this.$t('steps.describe-symptoms'),
                text: this.$t('steps.what-complaints-problem')
            },{
                number: '03',
                video: require('~/static/video/icons/07_icon.mp4'),
                title: this.$t('steps.you-get-specialist-advice'),
                text: this.$t('steps.specialist-initial-assessment')
            }],
        }
    },
    computed: {
        users() {
            /* return this.$store.getters['user/USERS'] */
            let users = 
            [
                {
                    "id": 1,
                    "price": 39,
                    "name": "Leanne Graham",
                    "username": "Bret",
                    "email": "Sincere@april.biz",
                    "address": {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                    },
                    "phone": "1-770-736-8031 x56442",
                    "website": "hildegard.org",
                    "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                    },
                    "description" : "111 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ullam labore dolor, laboriosam autem officiis ipsam incidunt voluptas, quidem reprehenderit vero consequatur, sint deleniti corporis sapiente deserunt provident adipisci reiciendis.",
                },
                {
                    "id": 2,
                    "price": 25,
                    "name": "Ervin Howell",
                    "username": "Antonette",
                    "email": "Shanna@melissa.tv",
                    "address": {
                    "street": "Victor Plains",
                    "suite": "Suite 879",
                    "city": "Wisokyburgh",
                    "zipcode": "90566-7771",
                    "geo": {
                        "lat": "-43.9509",
                        "lng": "-34.4618"
                    }
                    },
                    "phone": "010-692-6593 x09125",
                    "website": "anastasia.net",
                    "company": {
                    "name": "Deckow-Crist",
                    "catchPhrase": "Proactive didactic contingency",
                    "bs": "synergize scalable supply-chains"
                    },
                    "description" : "222 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ullam labore dolor, laboriosam autem officiis ipsam incidunt voluptas, quidem reprehenderit vero consequatur, sint deleniti corporis sapiente deserunt provident adipisci reiciendis.",
                },
                {
                    "id": 3,
                    "price": 45,
                    "name": "Clementine Bauch",
                    "username": "Samantha",
                    "email": "Nathan@yesenia.net",
                    "address": {
                    "street": "Douglas Extension",
                    "suite": "Suite 847",
                    "city": "McKenziehaven",
                    "zipcode": "59590-4157",
                    "geo": {
                        "lat": "-68.6102",
                        "lng": "-47.0653"
                    }
                    },
                    "phone": "1-463-123-4447",
                    "website": "ramiro.info",
                    "company": {
                    "name": "Romaguera-Jacobson",
                    "catchPhrase": "Face to face bifurcated interface",
                    "bs": "e-enable strategic applications"
                    },
                    "description" : "333 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto ullam labore dolor, laboriosam autem officiis ipsam incidunt voluptas, quidem reprehenderit vero consequatur, sint deleniti corporis sapiente deserunt provident adipisci reiciendis.",
                }
            ]
            return users;
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

<style lang="scss" scoped>
.section-header {
    &__title{
        text-align: center;
    }
}
</style>