<template>
	<div class = "page-billing-inner">
		<div class = "section">
			<div class = "container">
				<a v-if = "!userPaymentData.stripe_account_id && userPaymentData.url"
				   :href = "userPaymentData.url"
				   target = "_blank"
				   class = "link link--button link--button-blue link--button-gradient">{{ $t("page-billing.stripe.connecting") }}</a>
                <a v-else-if = "userPaymentData.stripe_account_id"
				   :href = "userPaymentData.url"
				   target = "_blank"
				   class = "link link--button link--button-blue link--button-gradient">{{ $t("page-billing.stripe.changestripe") }}</a>
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
            }
        },
    }
</script>


<style lang = "scss">

.page-billing-inner .section {
    padding-top: 0;
    padding-bottom: 0;
}


</style>