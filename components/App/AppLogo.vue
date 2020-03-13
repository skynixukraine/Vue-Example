<template>
	<NuxtLink :to = "$routes.home.path" class = "link app-logo__link">
		<div class = "app-logo">
			<div class = "app-logo__image"
				 :class = "{ 'app-logo__image--personal-office': $store.state.app.isPersonalOfficePage }"></div>
			<div class = "app-logo__text"
				 :class = "{ 'app-logo__text--personal-office': $store.state.app.isPersonalOfficePage }">
				{{ $t("links.logo-link") }}
			</div>
		</div>
	</NuxtLink>
</template>

<script>
    export default {
    }
</script>

<style lang = "scss" scoped>
	.app-logo {
		display     : flex;
		align-items : center;
		
		&__image, &__image--personal-office {
			$size: 48px;
			width               : $size;
			height              : $size;
			min-width           : $size;
			background-size     : cover;
			background-image    : url("~static/images/icons/logo.svg");
			background-repeat   : no-repeat;
			background-position : center center;
			
			&--personal-office {
				background-image : url("~static/images/icons/logo_blue.svg");
			}
		}
		
		&__text {
			width       : 150px;
			color       : $color-white;
			font-size   : 18px;
			margin-left : 10px;
			font-family : $TheAntiquaB;
			line-height : 1.3;
			font-weight : bold;
			
			&--personal-office {
				color : $color-curious-blue;
			}
		}
		
		&__link {
			:hover {
				text-decoration : none;
			}
		}
		
		@include phone-big {
			.app-logo {
				&__text { width : 100%; }
			}
		}
		
		@include tablet-big {
			.app-logo__image, .app-logo__image--personal-office {
				$size: 64px;
				width     : $size;
				height    : $size;
				min-width : $size;
			}
			
			.app-logo__text { font-size : 24px; }
		}
	}
</style>