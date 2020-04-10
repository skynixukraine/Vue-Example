<template>
	<div class="page">
		<div class="section vorteile-section"
			 :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}">
			<div class = "container container__mobile-adaptation">
				<h2 class="title">{{ this.$t('reset-password-page.new-password') }}</h2>
			</div>
		</div>
		<div class="container reset-password-page">
			<NewPassword />
		</div>
	
	</div>
</template>

<script>
    import NewPassword from "~/components/Authorization/NewPassword"

    export default {
        components : {
            NewPassword
        },
        head(){
            return {title : "Neues passwort"}
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
    }
</script>