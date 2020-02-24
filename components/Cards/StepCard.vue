<template>
	<ul class = "list list__step--cards">
		<li class = "list__item" v-for = "(step, index) in steps" :key = "index" style = "margin: 0;">
			<div class = "step-card" :class = "`step-card--${step.number}`">
				<header class = "step-card__header">
					<video class = "step-card__video"
						   :src = "step.video"
						   type = "video/mp4"
						   autoplay
						   loop
						   :ref="`video_${index}`"
						   playsinline
						   muted></video>
					<img :class = "`step-card__image-dots step-card__image-dots--${step.number}`"
						 :src = "require('~/static/images/images/dots.png')"
						 alt = "iphone" />
				</header>
				
				<div class = "step-card__main">
					<h3 class = "step-card__title">{{ step.title }}</h3>
					<p class = "step-card__text">{{ step.text }}</p>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
    export default {
        data(){
            return {
                steps : [{
                    number : '01',
                    video  : require('~/static/video/icons/05_icon.mp4'),
                    title  : this.$t('steps.choose-dermatologist'),
                    text   : this.$t('steps.dermatologist-at-clinic-essen')
                }, {
                    number : '02',
                    video  : require('~/static/video/icons/06_icon.mp4'),
                    title  : this.$t('steps.describe-symptoms'),
                    text   : this.$t('steps.what-complaints-problem')
                }, {
                    number : '03',
                    video  : require('~/static/video/icons/07_icon.mp4'),
                    title  : this.$t('steps.you-get-specialist-advice'),
                    text   : this.$t('steps.specialist-initial-assessment')
                }]
            }
        },
        mounted : function(){
            for (let key in this.$refs) {
                this.$refs[key][0].play()
            }
        }
    }
</script>

<style lang = "scss">
	.step-card {
		width          : 100%;
		max-width      : 928px;
		margin-left    : auto;
		margin-right   : auto;
		padding-bottom : 32px;
		align-items    : center;
		
		
		&--03 {
			background-image : none;
			padding-bottom   : 0;
		}
		
		&__header {
			position        : relative;
			z-index         : 1;
			display         : flex;
			justify-content : center;
			
			
		}
		
		&__video {
			font-family     : $font-family-secondary;
			font-size       : 24px;
			font-weight     : 700;
			display         : flex;
			justify-content : center;
			align-items     : center;
			width           : 64px;
			height          : 64px;
			min-width       : 64px;
			min-height      : 64px;
			border-radius   : 50%;
			background      : $color-gradient-blue-light;
			color           : $color-white;
			line-height     : 1;
		}
		
		&__main {
			background    : $color-white;
			margin-top    : -33px;
			padding       : 48px 16px 32px;
			border-radius : 20px;
			text-align    : center;
			
			.step-card__title{
				font-weight: 600;
			}
			.step-card__text{
				font-weight: 500;
				font-style: normal;
			}
		}
		
	
		
		&__image-dots {
			position : absolute;
			z-index  : -1;
			
			&--01 { display : none }
			
			&--02 { display : none }
			
			&--03 { display : none }
			
			
			@media (min-width : #{$screen-tablet-min}) {
				&--01 {
					display : block;
					bottom  : -119px
				}
				
				&--02 {
					display : block;
					bottom  : -179px
				}
			}
			
			
			@media (min-width : #{818px}) {
				&--01 {
					bottom : -72px
				}
				
				&--02 {
					bottom : -113px
				}
			}
			
			@media (min-width : #{898px}) {
				&--01 {
					display : block;
					bottom  : -72px
				}
				
				&--02 {
					bottom : -110px
				}
			}
			
			@include tablet-big {
				&--01 {
					bottom : -61px
				}
				
				&--02 {
					bottom : -97px
				}
				
			}
		}
		
		@include tablet {
			display : flex;
			// background-image: url('~static/images/images/dots.png');
			// background-repeat: no-repeat;
			// padding-bottom: 48px;
			
			
			&--01 {
				// background-position: 60px 77%;
				background-position : 121px 99%;
			}
			
			&--02 {
				// background-position: 60px 73%;
				background-position : 121px 99%;
			}
			
			&--03 {
				background-image : none;
				padding-bottom   : 0;
			}
			
			&__video {
				width      : 248px;
				height     : 248px;
				min-width  : 248px;
				min-height : 248px;
			}
			
			&__main {
				margin-top  : 0;
				margin-left : 64px;
				text-align  : left;
				padding     : 48px;
			}
		}
		
		@include tablet-big {
			
			&--01 {
				// background-position: 60px 87%;
				background-position : 121px 105%;
			}
			
			&--02 {
				// background-position: 60px 78%;
				background-position : 121px 99%;
			}
		}
	}
</style>