<template>
	<div>
		<div class = "faq-block">
			<div class="faq-block__header"  @click = "openTab" id="q1">
				<h3 class = "faq-block__title" >{{ this.$t('page-faq.q1.title')}}</h3>
				<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill="#247EE5"/>
				</svg>
			</div>
			<div class = "faq-block__content-wrap">
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p1') }}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p2_1') }}
					<NuxtLink :to = "$routes.awards.path" class = "link link--small-blue">
						{{this.$t('page-faq.q1.p2_a1')}}
					</NuxtLink>
					{{ this.$t('page-faq.q1.p2_2') }}
				</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p3')}}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p4')}}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q1.p5')}}</p>
			</div>
		</div>
		<div class = "faq-block ">
			<h3 class = "faq-block__title" id = "q2">{{ this.$t('page-faq.q2.title')}}</h3>
			<div class="step-section">
				<StepCard />
			</div>
		</div>
		<div class = "faq-block">
			<div class="faq-block__header"  @click = "openTab" id="q3">
				<h3 class = "faq-block__title" >{{ this.$t('page-faq.q3.title')}}</h3>
				<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill="#247EE5"/>
				</svg>
			</div>
			<div class = "faq-block__content-wrap">
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q3.p1')}}</p>
			</div>
		</div>
		<div class = "faq-block">
			<div class="faq-block__header"  @click = "openTab" id="q4">
				<h3 class = "faq-block__title">{{ this.$t('page-faq.q4.title')}}</h3>
				<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill="#247EE5"/>
				</svg>
			</div>
			<div class = "faq-block__content-wrap">
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p1')}}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p2')}}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q4.p3')}}</p>
			</div>
		</div>
		<div class = "faq-block">
			<div class="faq-block__header"  @click = "openTab" id = "q5">
				<h3 class = "faq-block__title">{{ this.$t('page-faq.q5.title')}}</h3>
				<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill="#247EE5"/>
				</svg>
			</div>
			<div class = "faq-block__content-wrap">
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q5.p1')}}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q5.p2')}}</p>
			</div>
		</div>
		<div class = "faq-block">
			<div class="faq-block__header"  @click = "openTab" id = "q6">
				<h3 class = "faq-block__title">{{ this.$t('page-faq.q6.title')}}</h3>
				<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill="#247EE5"/>
				</svg>
			</div>
			<div class = "faq-block__content-wrap">
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q6.p1')}}</p>
			</div>
		</div>
		<div class = "faq-block">
			<div class="faq-block__header"  @click = "openTab" id = "q7">
				<h3 class = "faq-block__title">{{ this.$t('page-faq.q7.title')}}</h3>
				<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill="#247EE5"/>
				</svg>
			</div>
			<div class = "faq-block__content-wrap">
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q7.p1')}}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q7.p2')}}</p>
			</div>
		</div>
		<div class = "faq-block">
			<div class="faq-block__header"  @click = "openTab" id = "q8" >
				<h3 class = "faq-block__title">{{ this.$t('page-faq.q8.title')}}</h3>
				<svg class="icon icon__small" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill="#247EE5"/>
				</svg>
			</div>
			<div class = "faq-block__content-wrap">
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q8.p1')}}</p>
				<p class = "faq-block__paragraph">{{ this.$t('page-faq.q8.p2_1') }}
					<a href = "https://smarthealth.de/teledermatologie/" class = "link link--small-blue">{{this.$t('page-faq.q8.p2_a1')}}</a>
					{{ this.$t('page-faq.q8.p2_2') }}
					<NuxtLink :to = "$routes.home.path" class = "link link--small-blue">{{this.$t('page-faq.q8.p2_a2')}}
					</NuxtLink>
					{{ this.$t('page-faq.q8.p2_3') }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
    import StepCard from "~/components/Cards/StepCard";
    import smoothScroll from "~/mixins/smooth-scroll";


    export default {
        methods    : {
            openTab(event){
                const wrapper    = document.querySelector(`#${event.currentTarget.id} + .faq-block__content-wrap`);
                const element = wrapper.parentNode;
                const openedTabs = document.querySelectorAll(`.faq-block__content-wrap--open, .faq-block--open`);
                const icon = document.querySelector(`#${event.currentTarget.id} > .icon`);
               
                wrapper.classList.toggle('faq-block__content-wrap--open');
                wrapper.parentNode.classList.toggle('faq-block--open');
                icon.classList.toggle('icon--active');

                if (element.classList.contains('faq-block--open')){
                    setTimeout(this.scrollToElement, 300, element );
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
				if (window.innerWidth < 768){
                    space -= 20;
				}
                window.scrollTo({
                    top      : element.getBoundingClientRect().top + window.pageYOffset - space,
                    behavior : "smooth"
                });
    
			}
        },
        components : {
            StepCard
        },
        mixins     : [
            smoothScroll,
        ]
    };
</script>

<style lang = "scss" scoped>
	
	$offset : 28px;
	
	.faq-contents {
		list-style-type : none;
	}
	
	.faq-block {
		margin-bottom    : 0;
		transition       : background-color .2s cubic-bezier(.4, 0, .6, 1);
		background-color : transparent;
		padding          : 0 20px 0;
		border-top       : 2px solid #e7e8e7;
		
		&:last-child {
			margin        : 0 0 24px 0;
			border-bottom : 2px solid #e7e8e7;
			
		}
		
		&--open {
			background-color : #FFF;
		}
		
		&__header{
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			align-items: center;
			cursor: pointer;
			
			&:focus{
				outline: none;
			}
		}
		
		&__title {
			padding : 15px 0;
			margin  : 0;
		}
		
		&__content-wrap {
			max-height : 0;
			overflow   : hidden;
			transition : background-color, max-height .3s cubic-bezier(.4, 0, .6, 1);
			
			&--open {
				max-height : 3000px;
				padding-bottom: 12px;
				
				.faq-block__paragraph {
					opacity : 1;
				}
			}
		}
		
		&__paragraph {
			margin-bottom : $main_offset;
			opacity       : 0;
			transition    : opacity .3s cubic-bezier(.4, 0, .6, 1);
			
			&:last-child {
				margin : 0;
			}
		}
	}
	
	.step-section{
		padding: 18px 0;
		
		@include tablet-big{
			padding: 24px 0;
		}
	}
	
	.icon{
		display: block;
		width: 100%;
		height: 100%;
		transition: transform .2s cubic-bezier(.4,0,.6,1),-webkit-transform .2s cubic-bezier(.4,0,.6,1);
		&--active{
			transform: rotate(-0.5turn);
		}
		
		&:active, &:focus{
			outline: none;
			background: transparent;
		}
	}
	
	.icon__small{
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}
</style>