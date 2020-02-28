<template>
	<nav class = "navigation"
		 :class = "{
		 	'navigation--active': $store.getters['app/IS_NAVIGATION_ACTIVE'],
		 	'navigation--personal-office': isPersonalOffice
		 }">
		<ul class = "navigation__list">
			<li class = "navigation__item"
				v-for = "(link, index) in links"
				:key = "index">
				<NuxtLink class = "link navigation__link" :to = "link.to"
						  :class = "{ 'navigation__link--personal-office': isPersonalOffice }">
					{{ link.text }}
				</NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<script>
    import scrollLock from "scroll-lock";
    import window from "~/mixins/window";

    export default {
        mixins   : [window],
        props    : {
            isPersonalOffice : {
                type    : Boolean,
                default : false
            }
        },
        computed : {
            links(){
                return [
                    {
                        to   : this.$routes.hautarzt.path,
                        text : this.$t('links.hautarzt')
                    },
                    {
                        to   : this.$routes.vorteile.path,
                        text : this.$t('links.vorteile')
                    },
                    {
                        to   : this.$routes.faq.path,
                        text : this.$t('links.faq')
                    },
                    {
                        to   : this.$routes.about.path,
                        text : this.$t('links.about')
                    },
                ]
            },
        },
        watch    : {
            windowWidth(width){
                // if return to desktop viewport - reset 'app/IS_NAVIGATION_ACTIVE' to default state
                if(width > 961 && this.$store.getters['app/IS_NAVIGATION_ACTIVE']){
                    this.$store.commit('app/SET_IS_NAVIGATION_ACTIVE', !this.$store.getters['app/IS_NAVIGATION_ACTIVE'])
                }
            },
            '$store.state.app.isNavigationActive'(isNavigationActive){
                isNavigationActive ? scrollLock.disablePageScroll() : scrollLock.enablePageScroll()
            },
        }
    }
</script>

<style lang = "scss" scoped>
	.navigation {
		left            : -100%;
		width           : 100%;
		height          : calc(100% - 64px);
		bottom          : 0;
		padding         : 68px;
		display         : flex;
		position        : fixed;
		background      : $color-stratos;
		transition      : left $transition ease-in-out;
		align-items     : center;
		justify-content : center;
		
		
		&--active { left : 0; }
		
		&__list {
			margin     : 0;
			padding    : 0;
			list-style : none;
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