<template>
	<div class = "user-avatar user-avatar__container" v-if = "isLogin">
		<img class = "user-avatar__image"
			 :src = "this.$store.state.user.user.photo || require('~/static/images/images/placeholder_doctor_man_img.jpg')"
			 alt = "user-avatar">
	</div>
</template>

<script>
    export default {
        computed : {
            isLogin(){
                return !!(this.$cookies.get(this.$cookie.names.token));
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.user-avatar {
		display     : flex;
		align-items : center;
		
		&__container { position : relative; }
		
		&__image {
			$size : 48px;
			width         : $size;
			height        : $size;
			min-width     : $size;
			border-radius : 50%;
			
			@include tablet-big {
				$size : 64px;
				width     : $size;
				height    : $size;
				min-width : $size;
			}
		}
	}
</style>