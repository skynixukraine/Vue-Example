<template>
	<div class = "page">
		<div class = "section faq-section"
			 :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}">
			<div class = "container container__mobile-adaptation">
				<h1 class="title">{{this.$t('page-faq.headline')}}</h1>
				<!--<h1>{{this.$t('page-faq.head.title')}}</h1>-->
				<h3 class="subtext">{{this.$t('page-faq.subtext')}}</h3>
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
		head(){
            return {title : this.$t("page-faq.head.title")}
        },
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
	.title,
	.subtext{
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