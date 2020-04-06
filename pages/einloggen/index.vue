<template>
	<div class="page">
		<div class="section section--authorization">
			<div class="container">
				<div class="container-forms">
						<Signin />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    // Components
    import Signin from "~/components/Authorization/Signin";
	
    export default {
        middleware: [
            'nonauth',
        ],
        head(){
            return {title : this.$t("page-auth.head.title")}
        },
        async fetch ({ app, store, error }) {
            // if token exist and user empty - load User object
            if (app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null) {
                await store.dispatch('user/LOAD_USER', { id: app.$cookies.get(app.cookie.names.tokenId), token: app.$cookies.get(app.cookie.names.token) })
                           .catch(error => {
                               app.$cookies.remove(app.cookie.names.token)
                               app.$cookies.remove(app.cookie.names.tokenId)
                           })
            }
        },

        components: {
            Signin
        },
    };
</script>
