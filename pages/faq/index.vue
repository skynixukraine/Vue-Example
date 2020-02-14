<template>
	<div class = "page">
		<div class = "section">
			<div class = "container">
				<h1>{{this.$t('page-faq.head.title')}}</h1>
				<FaqContent />
			</div>
		</div>
	</div>
</template>

<script>
	
    import FaqContent from "~/components/Static/FaqContent"
	
    export default {
        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null){
                await store.dispatch('user/LOAD_USER', {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                })
                           .catch(error => {
                               app.$cookies.remove(app.cookie.names.token)
                               app.$cookies.remove(app.cookie.names.tokenId)
                           })
            }
        },
        components: {
            FaqContent
        }
    }
</script>