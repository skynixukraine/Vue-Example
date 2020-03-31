<template>
	<header class = "app-header"
			:class = "{
				'app-header--bg-transparent': isHomePage,
				'app-header--bg-white': $store.state.app.isPersonalOfficePage,
				'app-header--bg-default': scrollTop > 57 && !$store.state.app.isPersonalOfficePage
			}">
		<div class = "app-header__inner">
			<div class = "app-header__item">
				<AppLogo />
			</div>
			<div class = "app-header__item">
				<Navigation />
			</div>
			<div class = "app-header__item app-header__item-logo" v-bind:class = "userIsLogIn">
				<HeaderUserInfo />
			</div>
			<div class = "app-header__item" v-if = "windowWidth < 962">
				<NavigationToggler />
			</div>
		</div>
	</header>
</template>

<script>
    import window from "~/mixins/window";
    import AppLogo from "~/components/App/AppLogo";
    import Navigation from "~/components/Navigation/Navigation";
    import HeaderUserInfo from "~/components/Header/HeaderUserInfo";
    import NavigationToggler from "~/components/Navigation/NavigationToggler";

    export default {
        mixins     : [window],
        components : {
            AppLogo,
            Navigation,
            NavigationToggler,
            HeaderUserInfo
        },
        computed   : {
            isHomePage(){
				return this.$route.name === "index";
			},
            userIsLogIn(){
                return this.$store.getters["user/USER"] === null ? "app-header__item--off" : '';
            }
        }
    };
</script>

<style lang = "scss">
	.app-header {
		top        : 0;
		left       : 0;
		width      : 100%;
		height     : 80px;
		z-index    : 100;
		padding    : 8px 15px;
		position   : fixed;
		background : $color-stratos;
		
		&--bg-transparent { 
			background : transparent;
			height: 115px;
    		padding: 25px 15px;
			transition: height 1s;
		}
		
		&--bg-white {
			background : $color-white;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
			height     : 80px;
			padding    : 8px 15px;
		}
		
		&--bg-default { 
			background : $color-stratos;
			height     : 80px;
			padding    : 8px 15px; 
		}
		
		&__inner {
			width           : 100%;
			margin          : 0 auto;
			display         : flex;
			max-width       : 1008px;
			justify-content : space-between;
		}
		
		&__item {
			display     : flex;
			align-items : center;
			
			&-logo {
				margin-left : auto;
				
				@include tablet-big {
					margin : 0;
				}
			}
			
			&--off {
				display : none;
			}
		}
	}
</style>