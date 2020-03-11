<template>
	<div class = "page">
		<div class = "section">
			<div class = "container">
				<div v-if = "serverResponse">
					<h1>{{ serverResponse.success ? "Account successful connected" : "Etwas ist schief gelaufen!" }}</h1>
					<code v-if = "!serverResponse.success">{{ serverResponse.message }}</code>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import UserApi from "~/services/api/User";

    export default {
        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters["user/USER"] === null){
                await store.dispatch("user/LOAD_USER", {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);

                    console.error(error);
                });
            }
        },
        data(){
            return {
                serverResponse : null
            }
        },
        computed : {
            stripeConnectCode(){
                return this.$route.query.code;
            },
        },
        mounted(){
            if(this.stripeConnectCode){
                let formData = new URLSearchParams();
                formData.append("code", this.stripeConnectCode);

                UserApi.connectPaymentStripe({
                    requestData : formData,
                    token       : this.$cookies.get(this.$cookie.names.token),
                    doctor_id   : this.$store.state.user.user.id,
                }).then(response => {
                    this.serverResponse = response;
                    
                    setTimeout(() => {
						this.$router.replace(this.$routes.billing.path);
					}, 2500);
                }).catch(response => {
                    this.serverResponse = response;
                    console.error("stripe connect from callback error", response);
                });
            } else{
                console.error("page dont have 'code' GET parameter");
                this.$router.replace(this.$routes.billing.path);
            }
        }
    }
</script>