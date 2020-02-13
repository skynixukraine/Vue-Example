<template>
	<div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q1.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p3')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p4')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p5')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q2.title')}}</h3>
			<StepCard/>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q3.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q3.p1')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q4.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p2')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p3')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q5.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q5.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q5.p2')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q6.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q6.p1')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q7.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q7.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q7.p2')}}</p>
		</div>
		<div class = "faq-block">
			<h3 class = "faq-block__title">{{ this.$t('page-faq.q8.title')}}</h3>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q8.p1')}}</p>
			<p class = "faq-block__paragraph">{{ this.$t('page-faq.q8.p2')}}</p>
		</div>
	</div>
</template>

<script>
    import StepCard from "~/components/Cards/StepCard"

    export default {
        data() {
            return {
                steps: [{
                    number: '01',
                    video: require('~/static/video/icons/05_icon.mp4'),
                    title: this.$t('steps.choose-dermatologist'),
                    text: this.$t('steps.dermatologist-at-clinic-essen')
                },{
                    number: '02',
                    video: require('~/static/video/icons/06_icon.mp4'),
                    title: this.$t('steps.describe-symptoms'),
                    text: this.$t('steps.what-complaints-problem')
                },{
                    number: '03',
                    video: require('~/static/video/icons/07_icon.mp4'),
                    title: this.$t('steps.you-get-specialist-advice'),
                    text: this.$t('steps.specialist-initial-assessment')
                }],
            }
        },
        components: {
            StepCard
        }
	};
</script>

<style lang = "scss" scoped>
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