<template lang = "html">
	<div class = "account-status">
		<span class = "account-status__title">{{ $t("page-personal-information.status") }}:</span>
		<span class = "account-status__value">{{ status }}</span>
	</div>
</template>

<script>
    export default {
        middleware : [
            "auth",
        ],
		computed:{
  			status(){
  			    return this.$store.state.user.user && this.$store.state.user.user.status && this.$store.state.user.user.status.toLowerCase();
			}
		}
    }
</script>

<style lang = "scss" scoped>
	.account-status {
		&__title {
			display : none;
			
			@include tablet {
				display : inline;
			}
		}
		
		&__value{ text-transform: capitalize; }
	}
</style>