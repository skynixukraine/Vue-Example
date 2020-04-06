<template>
	<nav class = "navigation"
		 :class = "{
		 	'navigation--active': $store.state.app.isNavigationActive,
		 	'navigation--personal-office': $store.state.app.isPersonalOfficePage
		 }">
		<ul class = "navigation__list">
			<li class = "navigation__item"
				v-for = "(link, index) in links"
				:key = "index">
				<NuxtLink class = "link navigation__link" :to = "link.to"
						  :class = "{ 'navigation__link--personal-office': $store.state.app.isPersonalOfficePage }">
					{{ link.text }}
				</NuxtLink>
			</li>
			<li class = "navigation__item"
				v-if = "$store.state.user.user && windowWidth < CHANGE_NAVIGATION_LAYOUT_WINDOW_WIDTH">
				<LogoutButton />
			</li>
		</ul>
	</nav>
</template>

<script>
    // import scrollLock from "scroll-lock";
    import window from "~/mixins/window";
    import constants from "~/assets/js/appConstans";
    import LogoutButton from "~/components/Authorization/LogoutButton";

    export default {
        mixins     : [window],
        components : {
            LogoutButton
        },
        data(){
            return {
                PERSONAL_OFFICE_LINKS : [
                    {
                        to   : this.$routes.personalInformation.path,
                        text : this.$t('sidebar.proff-info')
                    },
                    {
                        to   : this.$routes.billing.path,
                        text : "Billing"
                    },
                    {
                        to   : this.$routes.enquiries.path,
                        text : this.$t('sidebar.request')
                    },
                    {
                        to   : this.$routes.contact.path,
                        text : "Hilfe"
                    }
                ],
                MAIN_LINKS            : [
                    {
                        to   : this.$routes.hautarzt.path,
                        text : this.$t('links.hautarzt')
                    },
                    {
                        to   : this.$routes.vorteile.path,
                        text : this.$t('links.vorteile')
					},
					{
                        to   : this.$routes.registrierung.path,
                        text : this.$t('links.signup-hautarzte')
                    },
                    {
                        to   : this.$routes.faq.path,
                        text : this.$t('links.faq')
                    },
                    {
                        to   : this.$routes.about.path,
                        text : this.$t('links.about')
                    },
                ],

                CHANGE_NAVIGATION_LAYOUT_WINDOW_WIDTH : constants.mediaScreenTabletBigMin
            }
        },
        computed   : {
            links(){
                return this.$store.state.app.isPersonalOfficePage ?
                    this.windowWidth >= constants.mediaScreenTabletBigMin ?
                        this.MAIN_LINKS :
                        this.MAIN_LINKS.concat(this.PERSONAL_OFFICE_LINKS) :
                    this.MAIN_LINKS;
            },
        },
        watch      : {
            windowWidth(width){
                // if return to desktop viewport - reset state.app.isNavigationActive to default state
                if(width >= constants.mediaScreenTabletBigMin && this.$store.state.app.isNavigationActive){
                    this.$store.commit("app/SET_IS_NAVIGATION_ACTIVE", false);
                }
            },
            // '$store.state.app.isNavigationActive'(isNavigationActive){
            //     isNavigationActive ? scrollLock.disablePageScroll() : scrollLock.enablePageScroll();
            // },
        }
    }
</script>

<style lang = "scss" scoped>
	$padding : 68px;
	
	.navigation {
		left            : -100%;
		width           : 100%;
		height          : calc(100% - 64px);
		bottom          : 0;
		display         : flex;
		position        : fixed;
		overflow        : auto;
		background      : $color-stratos;
		transition      : left $transition ease-in-out;
		align-items     : center;
		justify-content : center;
		
		@include tablet-big {
			height  : auto;
			padding : $padding;
		}
		
		&--active { left : 0; }
		
		&__list {
			margin     : 0;
			padding    : $main_offset / 2 $padding;
			overflow   : auto;
			list-style : none;
			
			@include tablet-big {
				padding : 0;
			}
		}
		
		&__item {
			margin-bottom : 16px;
			
			&:last-child { margin-bottom : 0; }
		}
		
		&__link {
			color           : $color-white;
			display         : block;
			font-size       : 24px;
			font-family     : $TheSansB;
			font-weight     : 500;
			text-decoration : none;
			
			&--personal-office { color : $color-curious-blue; }
			
		}
		
		/deep/ .logout__link {
			@extend .navigation__link, .navigation__link--personal-office;
		}
		
		@include tablet-big {
			padding     : 0;
			display     : flex;
			position    : static;
			background  : transparent;
			align-items : center;
			
			&__list {
				display         : flex;
				justify-content : flex-end;
			}
			
			&__item {
				margin-right  : 30px;
				margin-bottom : 0;
				
				&:last-child { margin-right : 0; }
			}
			
			&__link { font-size : 18px; }
		}
		
		&--personal-office {
			background-color : $color-white;
			
			.navigation {
				&__link { color : $color-curious-blue; }
			}
		}
	}
</style>