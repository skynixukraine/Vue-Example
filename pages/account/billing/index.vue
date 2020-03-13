<template>
	<div class = "page">
		<div class = "section">
			<div class = "container">
				<h1>Billing</h1>
				<a v-if = "!userPaymentData.stripe_account_id && userPaymentData.url"
				   :href = "userPaymentData.url"
				   target = "_blank"
				   class = "link link--button link--button-blue link--button-gradient">Connect stripe account</a>
				<span v-else-if = "userPaymentData.stripe_account_id">You stripe account already connected!</span>
				<BillingTable />
			</div>
		</div>
	</div>
</template>

<script>
    import BillingTable from "~/components/Account/BillingTable.vue";
    export default {
        middleware : [
            "auth",
        ],
        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters["user/USER"] === null){
                await store.dispatch("user/LOAD_USER", {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                })
            }

            await store.dispatch("user/LOAD_AND_SAVE_PAYMENT_DATA", {
                doctor_id : store.state.user.user.id,
                token     : app.$cookies.get(app.cookie.names.token)
            })
        },
        computed   : {
            userPaymentData(){
                return this.$store.state.user.userPaymentData;
            }
        },
        components : {
            BillingTable,
        }
    }
</script>

<style lang = "scss"></style>