<template>
	<header class = "app-header"
			:class = "{
				'app-header--bg-transparent': isHomePage,
				'app-header--bg-white': isDashboard,
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
			isDashboard() {
				return this.$route.name === "dashboard" || this.$route.name === "account-billing" || this.$route.name === "account-personal-information" || this.$route.name === "enquiries" || this.$route.name === "enquiries-id" || this.$route.name === "vorlagen" || this.$route.name === "patient";
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
		transition: all 0.5s;	
		
		&--bg-transparent { 
			background : transparent;
			height: 115px;
    		padding: 25px 15px;
			/* transition: height 1s; */
		}
		
		&--bg-white {
			background : $color-white;
			box-shadow : 0 0 10px rgba(0, 0, 0, 0.07);
			height     : 80px;
			padding    : 8px 15px;
			
			.app-logo {
				max-width : 260px;
			}
			
			.navigation__item {
				margin-bottom : 16px;
				
				&:last-child { margin-bottom : 0; }
				
				@include tablet-big {
					margin-right  : 15px;
					margin-bottom : 0;
					
					&:last-child { margin-right : 0; }
				}
			}
		}
		
		&--bg-default { 
			background : $color-stratos;
			height     : 80px;
			padding    : 8px 15px;
			@include phone-big-max {
				height: 65px;
		} 
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