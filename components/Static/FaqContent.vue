<template>
	<div>
		<ul class="faq-contents">
			<li><h3><a href="#q1" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q1.title')}} </a></h3></li>
			<li><h3><a href="#q2" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q2.title')}} </a></h3></li>
			<li><h3><a href="#q3" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q3.title')}} </a></h3></li>
			<li><h3><a href="#q4" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q4.title')}} </a></h3></li>
			<li><h3><a href="#q5" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q5.title')}} </a></h3></li>
			<li><h3><a href="#q6" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q6.title')}} </a></h3></li>
			<li><h3><a href="#q7" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q7.title')}} </a></h3></li>
			<li><h3><a href="#q8" @click="scrollToElement" class="link link--small-blue">{{ this.$t('page-faq.q8.title')}} </a></h3></li>
		</ul>
		<br>
		<hr>
		<br>
		<div class = "faq-block" >
			<h3 class = "faq-block__title" id="q1">{{ this.$t('page-faq.q1.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p1') }}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p2_1') }}
				<NuxtLink :to="$routes.auszeichnungen.path" class="link link--small-blue">{{this.$t('page-faq.q1.p2_a1')}}</NuxtLink>
				{{ this.$t('page-faq.q1.p2_2') }}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p3')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p4')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p5')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title" id="q2">{{ this.$t('page-faq.q2.title')}}</h3>
			<KeepAlive>
				<StepCard />
			</KeepAlive>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title" id="q3">{{ this.$t('page-faq.q3.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q3.p1')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title" id="q4">{{ this.$t('page-faq.q4.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p2')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p3')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title" id="q5">{{ this.$t('page-faq.q5.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q5.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q5.p2')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title" id="q6">{{ this.$t('page-faq.q6.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q6.p1')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title" id="q7">{{ this.$t('page-faq.q7.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q7.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q7.p2')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title" id="q8">{{ this.$t('page-faq.q8.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q8.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q8.p2_1') }}
				<a href = "https://smarthealth.de/teledermatologie/" class="link link--small-blue">{{this.$t('page-faq.q8.p2_a1')}}</a>
				{{ this.$t('page-faq.q8.p2_2') }}
				<NuxtLink :to="$routes.home.path" class="link link--small-blue">{{this.$t('page-faq.q8.p2_a2')}}</NuxtLink>
				{{ this.$t('page-faq.q8.p2_3') }} </p>
		</div>
	</div>
</template>

<script>
    import StepCard from "~/components/Cards/StepCard"
	//mixins
    import smoothScroll from "~/mixins/smooth-scroll";


    export default {
        components : {
            StepCard
        },
        mixins : [
            smoothScroll,
        ]
    };
</script>

<style lang = "scss" scoped>
	.faq-contents{
		list-style-type: none;
		scroll-behavior: smooth;
		
	}
	.faq-block {
		margin-bottom : 28px;
		
		&:last-child {
			margin : 0;
		}
		
		&__title {
			margin-bottom : 28px;
		}
		
		&__paragraph {
			margin-bottom : 20px;
			
			&:last-child {
				margin : 0;
			}
		}
	}
	
</style>