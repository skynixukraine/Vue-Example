<template>
	<div class = "page page--home page--no-padding">
		<div class = "section section--fullscreen"
			 :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-2.jpg')})` }">
			<div class = "container">
				<HeroBanner />
			</div>
			<div class = "section-scroll-tooltip" v-if="show" v-bind:class = "{  'section-scroll-tooltip--off' : scroll_point }">
				<div class = "section-scroll-tooltip__inner">
					<a href = "#doctors" class = "scroll-link" @click = "scrollToElement">
						<svg class="mouse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 130" href = "#doctors" @click = "scrollToElement">
							<g fill="none" fill-rule="evenodd">
								<rect width="70" height="118" x="1.5" y="1.5" stroke="#FFF" stroke-width="3" rx="36"/>
								<circle class="scroll" cx="36.5" cy="31.5" r="4.5" fill="#FFF"/>
							</g>
						</svg>
						{{ $t("banners.herobanner.scroll-to-run") }}
					</a>
				</div>
			</div>
		</div>
		<div class = "section section--default-0 section--bg-right-1" id = "doctors">
			<div class = "container">
				<div class = "container__dots-svg container__dots-svg--doc-photo"></div>
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
				<header class = "section-header">
					<h2 class = "section-header__title">{{ $t('headers.few-steps') }}</h2>
				</header>
				<StepCard />
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
					<h2 class = "section-header__title section-header__title--white">{{ $t("headers.your-advantages") }}</h2>
				</header>
				<ul class = "list list--d4">
					<li class = "list__item" v-for = "(advantage, index) in advantages" :key = "index">
						<AdvantageCard :advantage = "advantage" />
					</li>
				</ul>
				<footer class = "section-footer">
					<NuxtLink :to = "$routes.faq.path" class = "link link--button link--button-white" exact>
						{{ $t("links.further-information") }}
					</NuxtLink>
				</footer>
			</div>
		</div>
		<div class = "section section--default-0">
			<div class = "container">
				<div class = "container__dots-svg container__dots-svg--consult-block"></div>
				<RequestBanner />
			</div>
		</div>
		<div class = "section">
			<div class = "container ">
				<div class = "container__dots-svg container__dots-svg--hand-photo"></div>
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
    import smoothScroll from "~/mixins/smooth-scroll";
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
            return {title : this.$t("page-home.head.title")}
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
                })
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
                    text : this.$t("links.home"),
                    to   : this.$routes.home.path
                }],

                scroll_point : false,

                advantages : [{
                    // icon: require('~/static/images/advantages/loupe.svg'),
                    video : 'https://ohn-public.s3.eu-central-1.amazonaws.com/media/01_icon.mp4',
                    text  : this.$t('advantages.independent-accessible')
                }, {
                    // icon: require('~/static/images/advantages/clock.svg'),
                    video : 'https://ohn-public.s3.eu-central-1.amazonaws.com/media/02_icon.mp4',
                    text  : this.$t('advantages.fast-time-saving')
                }, {
                    // icon: require('~/static/images/advantages/shield.svg'),
                    video : 'https://ohn-public.s3.eu-central-1.amazonaws.com/media/03_icon.mp4',
                    text  : this.$t('advantages.data-protection-compliant')
                }, {
                    // icon: require('~/static/images/advantages/diamond.svg'),
                    video : 'https://ohn-public.s3.eu-central-1.amazonaws.com/media/04_icon.mp4',
                    text  : this.$t('advantages.professional-trustworthy')
                }],
                show: true
            }
        },
        computed   : {
            doctors(){
                return this.$store.state.doctors.doctorsForHomePage
            }
        },
        mounted(){
            window.addEventListener('scroll', this.manageMouseBtn);
        },
        beforeDestroy(){
            window.removeEventListener("scroll", this.manageMouseBtn);
        },
        methods    : {
            manageMouseBtn(){

                let scrollY =  window.scrollY;

                if(scrollY >= 50 && this.show === true){
                    this.show = false;
				} else if(scrollY < 50 && this.show === false) {
                    this.show = true;
				}

                return window.innerWidth > 768 && scrollY > 20;
            },
            scrollToDoctors(event){
                const container = this.$el.querySelector("#doctors");
                container.scrollIntoView(true);
            }
        },
        components : {
            HeroBanner,
            DoctorCard,
            AdvantageCard,
            StepCard,
            LogoCard,
            RequestBanner,
            WhyInfo,
            DiseasesInfo,
        },
        mixins     : [
            smoothScroll,
        ]
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
	.mouse-btn-icon {
		position         : absolute;
		width            : 2px;
		height           : 6px;
		top              : 6px;
		left             : 50%;
		display          : none;
		transform        : translateX(-50%);
		background-color : white;
		border-radius    : 2px;
		
		@include tablet-big {
			display : block;
		}
	}
	@-webkit-keyframes scroll {
		0%, 20% {
			-webkit-transform: translateY(0) scaleY(1);
			transform: translateY(0) scaleY(1);
		}
		10% {
			opacity: 1;
		}
		100% {
			-webkit-transform: translateY(36px) scaleY(2);
			transform: translateY(36px) scaleY(2);
			opacity: 0.01;
		}
	}
	@keyframes scroll {
		0%, 20% {
			transform: translateY(0) scaleY(1);
		}
		10% {
			opacity : 1;
		}
		100% {
			transform : translateY(36px) scaleY(2);
			opacity   : 0.01;
		}
	}
	
	.scroll {
		animation-name            : scroll;
		animation-duration        : 1.5s;
		animation-timing-function : cubic-bezier(0.650, -0.550, 0.250, 1.500);
		animation-iteration-count : infinite;
		transform-origin          : 50% 30px;
		will-change               : transform;
	}
	
	.scroll-link {
		color           : white;
		display         : flex;
		align-items     : center;
		font-family     : $TheSansB;
		justify-content : flex-start;
	}
	.mouse {
		width         : 20px;
		height        : 32px;
		margin-right  : $main_offset;
		display       : none;

		@include tablet-big {
			display : block;
		}
	}
</style>