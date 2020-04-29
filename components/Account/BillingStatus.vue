<template>
	<div class = "page-billing-inner">
		<div class = "section">
			<div class = "container">
				<a v-if = "!userPaymentData.stripe_account_id && userPaymentData.url"
				   :href = "stripeConnectUrl"
				   target = "_blank"
				   class = "link link--button link--button-blue link--button-gradient">{{ $t("page-billing.stripe.connecting") }}</a>
                <a v-else-if = "userPaymentData.stripe_account_id"
				   :href = "stripeConnectUrl"
				   target = "_blank"
				   class = "link link--button link--button-blue link--button-gradient link--button-changestripe">{{ $t("page-billing.stripe.changestripe") }}</a>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        middleware : [
            "auth",
        ],
        computed   : {
            userPaymentData(){
                return this.$store.state.user.userPaymentData;
            },
            stripeConnectUrl(){
                return 'https://connect.stripe.com/express/oauth/authorize?redirect_url=' + this.$store.state.user.userPaymentData.url;
            },
        },
    }
</script>


<style lang = "scss">

.page-billing-inner .section {
    padding-top: 0;
    padding-bottom: 0;
	
	.link--button-changestripe {
		margin-top: 20px;
		@include tablet {
			margin-top: 0;
		}
	}
}


</style>