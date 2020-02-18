<template>
	<div class = "container">
		<div class = "hello-block">
			<div class = "hello-block__inner">
				<div class = "hello-block__title">
					{{ `${time},&nbsp;` }}
				</div>
				<div v-if = "getName&&getLastName" class = "hello-block__title">
					{{ getName + " " + getLastName }}
				</div>
				<div class = "hello-block__smile"></div>
			</div>
		</div>
		<div class = "text-block">
			{{ $t('dashboard.description')}}
		</div>
		<div class = "salary__box">
			<div class = "salary__total-enq">
				<h3>{{$t('dashboard.total-enq')}}</h3>
				<p>$999 999</p>
			</div>
			<div class = "salary__total-in">
				<h3>{{$t('dashboard.total-inc')}}</h3>
				<p>$999 999</p>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        data(){
            return {
                time : ''
				
            }
        },

        created(){
            if(process.client){
                const daytime = this.$timeOfDay;
                this.time     = this.$t(`times.${daytime}`);
            }
        },
        computed : {
            getName(){
                return this.$store.getters['user/USER'] ? this.$store.getters['user/USER'].first_name : "";
            },

            getLastName(){
                return this.$store.getters['user/USER'].last_name ? this.$store.getters['user/USER'].last_name : "";
            },
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
		
		&__inner {
			display         : flex;
			flex-direction  : column;
			justify-content : center;
			align-items     : center;
			padding         : 40px 0;
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
	
	.salary {
		&__box {
			padding: 20px 0;
			display         : flex;
			flex-direction  : column;
			justify-content : space-around;
			align-items     : center;
			
			@include tablet {
				flex-direction : row;
				padding: 20px 0;
				justify-content : space-between;
			}
		}
		
		&__total-enq, &__total-in{
			background: white;
			min-height: 200px;
			width: 100%;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding: 20px;
			
			@include tablet {
				width: 45%;
			}
		}
		
		&__total-enq{
			margin: 0 0 20px 0;
			@include tablet {
				margin: 0;
			}
		}
		
		&__total-in{
			
			@include tablet {
			
			}
		}
	}
</style>