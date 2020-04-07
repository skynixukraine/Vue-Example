<template>
	<NuxtLink :to = "$routes.dashboard.path" exact>
		<div v-if = "$store.getters['user/USER']"
			 class = "header-user-info"
			 :class = "{ 'header-user-info--personal-office': $store.state.app.isPersonalOfficePage,
			  }">
			<div class = "header-user-info__text"
			:class = "{
				'header-user-info--visible': isNotDashboard
			}">
				<div class = "header-user-info__item"
					 :class = "{ 
						 		  'header-user-info__item--personal-office': $store.state.app.isPersonalOfficePage, 
					 			   }">
					{{
					$store.getters["user/USER"].first_name && $store.getters["user/USER"].last_name ?
						$store.getters["user/USER"].first_name + " " + $store.getters["user/USER"].last_name :
						$store.getters["user/USER"].email
					}}
				</div>
				<div :class = "{
				}" class = "header-user-info__item__account-status" v-if = "$store.getters['user/USER'] && $store.getters['user/USER'].status">
					<p>{{ $store.getters["user/USER"].status.toLowerCase() }}</p>
				</div>
			</div>
			<div class = "header-user-info__item">
				<UserAvatar />
			</div>
		</div>
	</NuxtLink>
</template>

<script>
    import UserAvatar from "~/components/User/UserAvatar";

    export default {
        data(){
            return {
                isLogin : true,
            }
		},
		computed : {
			isNotDashboard() {
				return this.$route.name !== "dashboard" && this.$route.name !== "account-billing" && this.$route.name !== "account-personal-information" && this.$route.name !== "enquiries";
			}
		},
        components : {
            UserAvatar
        }
    }
</script>

<style lang = "scss" scoped>
	.header-user-info {
		width           : 100%;
		height          : auto;
		display         : flex;
		max-width       : 300px;
		background      : $color-stratos;
		transition      : left $transition ease-in-out;
		align-items     : center;
		flex-direction  : row-reverse;
		justify-content : center;

		
		
		&--personal-office {
			background : $color-white;
		}
		
		&__text {
			display      : none;
			font-size    : 18px;
			line-height  : 20px;
			padding-left : 10px;
			
			@include desktop {
				display : block;
			}
		}
		
		&__item {
			color           : $color-white;
			display         : block;
			font-weight     : 400;
			margin-bottom   : 0;
			text-decoration : none;
			
			// hide user name
			&:first-child {
				display : none;
				
			
			}
			
			&:last-child {
				margin-bottom : 0;
			}
			
			&__account-status {
				color          : $color-user-is-active;
				display        : none;
				font-size      : 14px;
				text-transform : capitalize;
				
				@media (min-width : #{1130px}) {
					display : flex;
				}
			}
			
			&--personal-office {
				color       : $color-rolling-stone;
				font-size   : 18px;
				font-style  : normal;
				font-weight : 500;
			}
		}
		
		@include tablet-big {
			padding    : 0;
			background : transparent;
			
			&__item {
				&:last-child { margin-right : 0; }
			}
		}
		&--visible {
			display: none;
		}
	}
</style>