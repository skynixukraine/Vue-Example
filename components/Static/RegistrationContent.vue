<template>
	<div>
		<div class="registration-video">
			<h3 class="registration-video__title">{{ this.$t('register-page.video-title')}}</h3>
		<iframe  src="https://www.youtube.com/embed/CiPYqDfTNrQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
			<div class="registration-content">
			<div class = "faq-block faq-block__one">
				<div class = "faq-block__header" @click = "openTab" id = "q1">
					<h3 class = "faq-block__title">{{ this.$t('register-page.questions.q1.title')}}</h3>
					<svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
						<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
					</svg>
				</div>
				<div class = "faq-block__content-wrap">
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q1.p1')}}</p>
				</div>
			</div>
			<div class = "faq-block faq-block__two">
				<div class = "faq-block__header" @click = "openTab" id = "q2">
					<h3 class = "faq-block__title">{{ this.$t('register-page.questions.q2.title')}}</h3>
					<svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
						<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
					</svg>
				</div>
				<div class = "faq-block__content-wrap">
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q2.p1')}}</p>
				</div>
			</div>
				<h4>{{ this.$t('register-page.register_text')}}</h4>
				<Signup />
			<div class = "faq-block faq-block__three">
				<div class = "faq-block__header" @click = "openTab" id = "q3">
					<h3 class = "faq-block__title">{{ this.$t('register-page.questions.q3.title')}}</h3>
					<svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
						<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
					</svg>
				</div>
				<div class = "faq-block__content-wrap">
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q3.p1')}}</p>
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q3.p2')}}</p>
				</div>
			</div>
			<div class = "faq-block">
				<div class = "faq-block__header" @click = "openTab" id = "q4">
					<h3 class = "faq-block__title">{{ this.$t('register-page.questions.q4.title')}}</h3>
					<svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
						<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
					</svg>
				</div>
				<div class = "faq-block__content-wrap">
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q4.p1')}}</p>
				</div>
			</div>
			<div class = "faq-block">
				<div class = "faq-block__header" @click = "openTab" id = "q5">
					<h3 class = "faq-block__title">{{ this.$t('register-page.questions.q5.title')}}</h3>
					<svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
						<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
					</svg>
				</div>
				<div class = "faq-block__content-wrap">
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q5.p1')}}</p>
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q5.p2')}}</p>
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q5.p3')}}</p>
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q5.p4')}}</p>
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q5.p5')}}</p>
				</div>
			</div>
			<div class = "faq-block">
				<div class = "faq-block__header" @click = "openTab" id = "q6">
					<h3 class = "faq-block__title">{{ this.$t('register-page.questions.q6.title')}}</h3>
					<svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
						<path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
					</svg>
				</div>
				<div class = "faq-block__content-wrap">
					<p class = "faq-block__paragraph">{{ this.$t('register-page.questions.q6.p1')}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import StepCard from "~/components/Cards/StepCard";
    import Signup from "~/components/Authorization/Signup";
    import smoothScroll from "~/mixins/smooth-scroll";

    export default {
        methods    : {
            openTab(event){
                const wrapper    = document.querySelector(`#${event.currentTarget.id} + .faq-block__content-wrap`);
                const element    = wrapper.parentNode;
                const openedTabs = document.querySelectorAll(`.faq-block__content-wrap--open, .faq-block--open`);
                const icon       = document.querySelector(`#${event.currentTarget.id} > .icon`);

                wrapper.classList.toggle('faq-block__content-wrap--open');
                wrapper.parentNode.classList.toggle('faq-block--open');
                icon.classList.toggle('icon--active');

                if(element.classList.contains('faq-block--open')){
                    setTimeout(this.scrollToElement, 300, element);
                }

                [].forEach.call(openedTabs, function(item){
                    if(item.classList.contains('faq-block--open')){
                        item.classList.remove('faq-block--open');
                        item.getElementsByTagName('svg')[0].classList.remove('icon--active')
                    } else{
                        item.classList.remove('faq-block__content-wrap--open')
                    }
                });
            },
            scrollToElement(element){
                let space = 90;
                if(window.innerWidth < 768){
                    space -= 20;
                }
                window.scrollTo({
                    top      : element.getBoundingClientRect().top + window.pageYOffset - space,
                    behavior : "smooth"
                });
            }
        },
        components : {
            StepCard,
            Signup
        },
        mixins     : [
            smoothScroll,
        ]
    };
</script>

<style lang = "scss" scoped>
	$offset : 28px;
	
	.registration-video {
		text-align: center;
		margin-bottom: 50px;
		iframe {
			width: 100%;
			max-width: 560px;
			height: 48vw;
			@include tablet {
				height: 315px;
			}
		}
	}
	
	.faq-contents { list-style-type : none; }
	.registration-content {
		&__blue-text {
			text-align: center;
			margin: 30px 0;
			color: $color-curious-blue;
		}
		.faq-block {
			padding          : 0 $main_offset 0;
			transition       : background-color .2s cubic-bezier(.4, 0, .6, 1);
			border-top       : 2px solid #E7E8E7;
			margin-bottom    : 0;
			background-color : transparent;
			
			
			&--step { background-color : transparent; }
			
			&--open { background-color : #FFF; }
			
			&__header {
				cursor          : pointer;
				display         : flex;
				align-items     : center;
				flex-direction  : row;
				justify-content : space-between;
				
				&:focus { outline : none; }
			}
			
			&__title {
				margin  : 0;
				padding : 15px 0;
				color   : #247EE5;
			}
			
			&__content-wrap {
				overflow   : hidden;
				max-height : 0;
				transition : background-color, max-height .3s cubic-bezier(.4, 0, .6, 1);
				
				&--open {
					max-height     : 3000px;
					padding-bottom : 12px;
					
					.faq-block__paragraph { opacity : 1; }
				}
			}
			
			&__paragraph {
				opacity       : 0;
				transition    : opacity $transition cubic-bezier(.4, 0, .6, 1);
				margin-bottom : $main_offset;
				
				&:last-child { margin : 0; }
			}
		}
		
		
		.faq-block:last-of-type {
			margin        : 0 0 24px 0;
			border-bottom : 2px solid #E7E8E7;
		}
		
		.faq-block__two {
			margin        : 0 0 50px 0;
			border-bottom : 2px solid #E7E8E7;
		}
		
		.faq-block__three {
			margin-top: 50px;
		}
		
		
		.step-section {
			padding : 18px 0;
			
			@include tablet-big {
				padding : 24px 0;
			}
		}
		
		.icon {
			width      : 100%;
			height     : 100%;
			display    : block;
			transition : transform .2s cubic-bezier(.4, 0, .6, 1), -webkit-transform .2s cubic-bezier(.4, 0, .6, 1);
			
			&--active {
				transform : rotate(-0.5turn);
			}
			
			&:active, &:focus {
				outline    : none;
				background : transparent;
			}
		}
		
		.icon__small {
			$size : 20px;
			width       : $size;
			height      : $size;
			flex-shrink : 0;
		}
		
		.faq-block--step.faq-block--open {
			background-color : transparent;
		}
		
	}
	.title, .subtext {
		color: white;
	}
</style>