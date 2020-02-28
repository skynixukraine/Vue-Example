<template>
	<div class = "page">
		<div class = "section faq-section"
			 :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-1.jpg')})`}">
			<div class = "container" :style = "{padding: '80px'}">
				<h3>Häufig gestellte Fragen (FAQ)</h3>
				<h1>Sie haben Fragen, wir die Antworten.</h1>
				<!--<h1>{{this.$t('page-faq.head.title')}}</h1>-->
				<h3>Hier finden Sie Antworten auf häufig gestellte Fragen (FAQ) zu OnlineDoctor.</h3>
			</div>
		</div>
		<div class = "container">
			<FaqContent />
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
        components : {
            FaqContent
        }
    }
</script>

<style lang = "scss" scoped>
	h4, h3, h1{
		color: white;
	}
	
	.page{
		padding-top: 64px;
		
		@include tablet-big{
			padding-top: 68px;
		}
	}
	
	.faq-section{
		margin: 0 0 32px 0;
		padding: 0;
		
		@include tablet-big{
			margin: 0 0 60px 0;
		}
	}
</style>