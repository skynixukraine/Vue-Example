<template>
	<div class = "page page--home page--no-padding">
		<div class = "section section--fullscreen"
			 :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-2.jpg')})` }">
			<div class = "container">
				<HeroBanner />
			</div>
			<div class = "section-scroll-tooltip">
				<div class = "section-scroll-tooltip__inner">{{ $t('banners.herobanner.scroll-to-run') }}</div>
			</div>
		</div>
		<div class = "section section--default-0 section--bg-right-1">
			<div class = "container">
				<img class = "container__dots container__dots--4"
					 :src = "require('~/static/images/images/dots-squere.png')"
					 alt = "dots">
				<header class = "section-header">
					<h2 class = "section-header__title">{{ $t('headers.our-family-doctors') }}</h2>
				</header>
				<ul class = "list list--d3">
					<li class = "list__item" v-for = "(doctor, index) in doctors" :key = "index">
						<DoctorCard :doctor = "doctor" />
					</li>
				</ul>
				<footer class = "section-footer">
					<NuxtLink :to = "$routes.hautarzt.path"
							  class = "link link--button link--button-blue link--button-gradient"
							  exact>{{ $t('links.show-all') }}
					</NuxtLink>
				</footer>
			</div>
		</div>
		<div class = "section section--bg-left-2">
			<div class = "container">
				<img class = "container__dots container__dots--3"
					 :src = "require('~/static/images/images/dots-squere.png')"
					 alt = "dots">
				<header class = "section-header">
					<h2 class = "section-header__title">{{ $t('headers.few-steps') }}</h2>
				</header>
				<ul class = "list list__step--cards">
					<li class = "list__item" v-for = "(step, index) in steps" :key = "index" style = "margin: 0;">
						<StepCard :step = "step" />
					</li>
				</ul>
				<footer class = "section-footer">
					<NuxtLink :to = "$routes.faq.path"
							  class = "link link--button link--button-mobile-large link--button-gradient"
							  exact>{{ $t('links.frequently-asked') }}
					</NuxtLink>
				</footer>
			</div>
		</div>
		<div class = "section section--64-64"
			 :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-1.jpg')})` }"
			 style = "position:relative;z-index:1;">
			<div class = "container">
				<header class = "section-header">
					<h2 class = "section-header__title section-header__title--white">{{ $t('headers.your-advantages') }}</h2>
				</header>
				<ul class = "list list--d4">
					<li class = "list__item" v-for = "(advantage, index) in advantages" :key = "index">
						<AdvantageCard :advantage = "advantage" />
					</li>
				</ul>
				<footer class = "section-footer">
					<NuxtLink :to = "$routes.faq.path" class = "link link--button link--button-white" exact>{{ $t('links.further-information') }}</NuxtLink>
				</footer>
			</div>
		</div>
		<div class = "section section--default-0">
			<div class = "container">
				<img class = "container__dots container__dots--1"
					 :src = "require('~/static/images/images/dots-squere.png')"
					 alt = "dots">
				<RequestBanner />
			</div>
		</div>
		<div class = "section">
			<div class = "container">
				<img class = "container__dots container__dots--2"
					 :src = "require('~/static/images/images/dots-squere.png')"
					 alt = "dots">
				<WhyInfo />
			</div>
		</div>
		<div class = "section section--0-default">
			<div class = "container">
				<DiseasesInfo />
			</div>
		</div>
	</div>
</template>

<script>
    import StepCard from "~/components/Cards/StepCard";
    import LogoCard from "~/components/Cards/LogoCard";
    import WhyInfo from "~/components/Content/WhyInfo";
    import DoctorCard from "~/components/Cards/DoctorCard";
    import HeroBanner from "~/components/Banners/HeroBanner";
    import AdvantageCard from "~/components/Cards/AdvantageCard";
    import DiseasesInfo from "~/components/Content/DiseasesInfo";
    import RequestBanner from "~/components/Banners/RequestBanner";

    export default {
        head(){
            return {title : this.$t('page-home.head.title')}
        },

        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null){
                await store.dispatch('user/LOAD_USER', {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                });
            }

            await store.dispatch('doctors/LOAD_AND_SAVE_DOCTORS_FOR_HOME_PAGE', {
                per_page  : 3,
                order_by  : "id",
                direction : "asc"
            })
        },

        data(){
            return {
                breadcrumbs : [{
                    text : this.$t('links.home'),
                    to   : this.$routes.home.path
                }],

                advantages : [{
                    // icon: require('~/static/images/advantages/loupe.svg'),
                    video : require('~/static/video/icons/01_icon.mp4'),
                    text  : this.$t('advantages.independent-accessible')
                }, {
                    // icon: require('~/static/images/advantages/clock.svg'),
                    video : require('~/static/video/icons/02_icon.mp4'),
                    text  : this.$t('advantages.fast-time-saving')
                }, {
                    // icon: require('~/static/images/advantages/shield.svg'),
                    video : require('~/static/video/icons/03_icon.mp4'),
                    text  : this.$t('advantages.data-protection-compliant')
                }, {
                    // icon: require('~/static/images/advantages/diamond.svg'),
                    video : require('~/static/video/icons/04_icon.mp4'),
                    text  : this.$t('advantages.professional-trustworthy')
                }],

                steps : [{
                    number : '01',
                    video  : require('~/static/video/icons/05_icon.mp4'),
                    title  : this.$t('steps.choose-dermatologist'),
                    text   : this.$t('steps.dermatologist-at-clinic-essen')
                }, {
                    number : '02',
                    video  : require('~/static/video/icons/06_icon.mp4'),
                    title  : this.$t('steps.describe-symptoms'),
                    text   : this.$t('steps.what-complaints-problem')
                }, {
                    number : '03',
                    video  : require('~/static/video/icons/07_icon.mp4'),
                    title  : this.$t('steps.you-get-specialist-advice'),
                    text   : this.$t('steps.specialist-initial-assessment')
                }],
            }
        },
        computed : {
            doctors(){
                return this.$store.state.doctors.doctorsForHomePage;
            }
        },

        components : {
            WhyInfo,
            StepCard,
            LogoCard,
            HeroBanner,
            DoctorCard,
            DiseasesInfo,
            AdvantageCard,
            RequestBanner,
        }
    }
</script>

<style lang = "scss" scoped>
	.section-header {
		&__title {
			text-align : center;
		}
	}
	
	.container__dots--4 {
		top      : 60px;
		left     : -56px;
		z-index  : -1;
		position : absolute;
		
		@media screen and(max-width : 961px) {
			display : none;
		}
	}
</style>