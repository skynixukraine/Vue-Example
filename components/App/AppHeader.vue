<template>
	<header class = "app-header"
			:class = "{
				'app-header--bg-transparent': isHomePage,
				'app-header--bg-white': isPersonalOffice,
				'app-header--bg-default': scrollTop > 68 && !isPersonalOffice
			}">
		<div class = "app-header__inner">
			<div class = "app-header__item">
				<AppLogo :isPersonalOffice = "isPersonalOffice" />
			</div>
			<div class = "app-header__item">
				<Navigation :isPersonalOffice = "isPersonalOffice" />
			</div>
			<div class = "app-header__item app-header__item-logo" v-bind:class = "userIsLogIn">
				<HeaderUserInfo :isPersonalOffice = "isPersonalOffice" />
			</div>
			<div class = "app-header__item" v-if = "windowWidth < 962">
				<NavigationToggler :isPersonalOffice = "isPersonalOffice" />
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
            isPersonalOffice(){
                return !!(~this.$route.fullPath.indexOf(this.$routes.dashboard.path) ||
						  ~this.$route.fullPath.indexOf(this.$routes.personalInformation.path) ||
						  ~this.$route.fullPath.indexOf(this.$routes.billing.path) ||
						  ~this.$route.fullPath.indexOf(this.$routes.enquiries.path));
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
		height     : 64px;
		z-index    : 100;
		padding    : 8px 15px;
		position   : fixed;
		background : $color-stratos;
		
		&--bg-transparent { background : transparent; }
		
		&--bg-white { background : $color-white; }
		
		&--bg-default { background : $color-stratos; }
		
		&__inner {
			width           : 100%;
			margin          : 0 auto;
			display         : flex;
			max-width       : 1120px;
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
		
		@include tablet-big {
			height  : 80px;
			padding : 8px 15px;
		}
	}
</style>