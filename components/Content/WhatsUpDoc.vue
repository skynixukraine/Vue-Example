<template>
	<div class = "hello-block">
		<div class = "hello-block__inner">
			<div class = "hello-block__title">
				{{ `Good ${this.$timeOfDay},&nbsp;` }}
			</div>
			<div v-if = "getName&&getLastName" class = "hello-block__title">
				{{ getName + " " + getLastName }}
			</div>
			<div class = "hello-block__smile"></div>
		</div>
	</div>
</template>

<script>
    export default {
        computed : {
            getName(){
                return this.$store.getters['user/USER'].first_name
            },

            getLastName(){
                return this.$store.getters['user/USER'].last_name

            }
        }
    }
</script>

<style lang = "scss" scoped>
	.hello-block {
		position        : relative;
		display         : flex;
		flex-direction  : column;
		justify-content : center;
		align-items     : center;
		height          : 100%;
		min-height      : calc(100vh - 80px);
		
		&__inner {
			display         : flex;
			flex-direction  : column;
			justify-content : center;
			align-items     : center;
			padding-bottom  : 110px;
			flex-wrap       : wrap;
			
			@include breakpoints(xs) {
				flex-direction : row;
				
			}
		}
		
		&__title {
			color       : $color-curious-blue;
			font-family : $font-family-primary;
			font-size   : 24px;
			text-align  : center;
		}
		
		&__smile {
			width               : 40px;
			height              : 40px;
			background-image    : url("~static/images/icons/hello-smile.svg");
			background-repeat   : no-repeat;
			background-position : center;
			
			@include breakpoints(xs) {
				margin : 0 0 0 20px;
			}
			
		}
	}
</style>