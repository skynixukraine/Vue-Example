<template>
	<button class = "navigation-toggle"
			:class = "{ 'navigation-toggle--active': $store.getters['app/IS_NAVIGATION_ACTIVE'] }"
			@click.stop = "toggleNavigationActive">
		<span :class = "{'navigation-toggle--personal-office': isPersonalOffice }"></span>
	</button>
</template>

<script>
    export default {
        props    : {
            isPersonalOffice : {
                type    : Boolean,
                default : false
            }
        },
        methods  : {
            toggleNavigationActive(){
                this.$store.commit("app/SET_IS_NAVIGATION_ACTIVE", !this.$store.getters["app/IS_NAVIGATION_ACTIVE"])
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
			background-color : $color-river-bed;
			
			&:before {
				top              : -$offset;
				background-color : $color-river-bed;
			}
			
			&:after {
				top              : $offset;
				background-color : $color-river-bed;
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