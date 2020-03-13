<template>
	<button class = "navigation-toggle"
			:class = "{ 'navigation-toggle--active': $store.state.app.isNavigationActive }"
			@click.stop = "toggleNavigationActive">
		<span :class = "{'navigation-toggle--personal-office': $store.state.app.isPersonalOfficePage }"></span>
	</button>
</template>

<script>
    export default {
        methods  : {
            toggleNavigationActive(){
                this.$store.commit("app/SET_IS_NAVIGATION_ACTIVE", !this.$store.state.app.isNavigationActive)
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.navigation-toggle {
		$size: 32px;
		$offset : 10px;
		width            : $size;
		height           : $size;
		border           : none;
		padding          : 0;
		position         : relative;
		background-color : transparent;
		
		span, .navigation-toggle--personal-office {
			$height: 3px;
			left             : 0;
			width            : $size;
			height           : $height;
			position         : absolute;
			background-color : #FFF;
			
			&:before, &:after {
				left             : 0;
				width            : $size;
				height           : $height;
				content          : '';
				position         : absolute;
				transition       : $transition;
				background-color : #FFF;
			}
			
			&::before { top : -$offset; }
			
			&::after { top : $offset; }
		}
		
		.navigation-toggle--personal-office {
			background-color : $color-tory-blue;
			
			&:before {
				top              : -$offset;
				background-color : $color-tory-blue;
			}
			
			&:after {
				top              : $offset;
				background-color : $color-tory-blue;
			}
		}
		
		&.navigation-toggle--active {
			span {
				$angle: 45deg;
				background-color : transparent;
				
				&:before {
					top       : 0;
					transform : rotate($angle);
				}
				
				&:after {
					top       : 0;
					transform : rotate(-$angle);
				}
			}
		}
	}
</style>