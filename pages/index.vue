<template>
	<div class = "page page--home page--no-padding">
		<div class = "section section--fullscreen"
			 :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-2.jpg')})` }">
			<div class = "container">
				<HeroBanner />
			</div>
			<div class = "section-scroll-tooltip" v-bind:class = "{  'section-scroll-tooltip--off' : scroll_point }">
				<div class = "section-scroll-tooltip__inner">
					<a href = "#doctors" class="scroll-link" @click = "scrollToElement">
						<div class = "mouse-icon" @click = "scrollToElement">
							<div class = "mouse-btn-icon scroll"></div>
						</div>
					
					{{ $t('banners.herobanner.scroll-to-run') }}
					</a>
				
				</div>
			
			</div>
			>
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
					<h2 class = "section-header__title section-header__title--white">{{ $t('headers.your-advantages')
						}}</h2>
				</header>
				<ul class = "list list--d4">
					<li class = "list__item" v-for = "(advantage, index) in advantages" :key = "index">
						<AdvantageCard :advantage = "advantage" />
					</li>
				</ul>
				<footer class = "section-footer">
					<NuxtLink :to = "$routes.faq.path" class = "link link--button link--button-white" exact>{{
						$t('links.further-information') }}
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
    import HeroBanner from "~/components/Banners/HeroBanner"
    import DoctorCard from "~/components/Cards/DoctorCard"
    import AdvantageCard from "~/components/Cards/AdvantageCard"
    import StepCard from "~/components/Cards/StepCard"
    import LogoCard from "~/components/Cards/LogoCard"
    import RequestBanner from "~/components/Banners/RequestBanner"
    import WhyInfo from "~/components/Content/WhyInfo"
    import DiseasesInfo from "~/components/Content/DiseasesInfo"

    import smoothScroll from "~/mixins/smooth-scroll";


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
                })
                           .catch(error => {
                               app.$cookies.remove(app.cookie.names.token)
                               app.$cookies.remove(app.cookie.names.tokenId)
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
                    text : this.$t('links.home'),
                    to   : this.$routes.home.path
                }],

                scroll_point : false,

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
                }]
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
            window.removeEventListener('scroll', this.manageMouseBtn);
        },
        methods    : {
            manageMouseBtn(){
                if(window.scrollY > 20){
                    this.scroll_point = true;
                } else{
                    this.scroll_point = false;
                }
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
	
	.mouse-icon {
		position      : relative;
		height        : 32px;
		width         : 20px;
		box-sizing    : border-box;
		border        : 2px solid white;
		border-radius : 20px;
		margin-right  : 20px;
		z-index       : -1;
	}
	
	.mouse-btn-icon {
		position         : absolute;
		width            : 2px;
		height           : 6px;
		top              : 6px;
		left             : 50%;
		transform        : translateX(-50%);
		background-color : white;
		border-radius    : 2px;
	}
	
	@keyframes scroll {
		
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
	
	.scroll-link{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color : white;
		font-family: $TheSansB;
		
	}

</style>