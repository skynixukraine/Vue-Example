<template>
	<div class = "payment">
		<card class = "payment__card input"
			  :class = "{ 'payment__card--is-success': isAllFieldsFilled }"
              v-bind:stripe="stripeKey"
			  :options = "stripeOptions"
			  @change = "onChange" />
		<button class = "payment__submit-btn"
				:class = "{'payment__submit-btn--is-disabled': !isAllFieldsFilled}"
				type = "button"
				@click = "onPay">{{ $t("page-forschung.chat.nextBtn") }}
		</button>
	</div>
</template>

<script>
    import window from "~/mixins/window";
    import {Card, createToken} from "~/node_modules/vue-stripe-elements-plus";

    export default {
        mixins     : [
            window
        ],
        components : {Card},
        data(){
            return {
                isAllFieldsFilled : false,
                stripeKey : process.env.STRIPE_KEY
            }
        },
        computed   : {
            fontSize(){
                return this.windowWidth ? this.windowWidth > 480 ? "18px" : "16px" : "16px";
            },
            stripeOptions(){
                return {
                    style : {
                        base : {
                            color      : "#000",
                            fontSize   : this.fontSize,
                            fontFamily : "TheSansB",
                            lineHeight : this.fontSize,
                        }
                    }
                }
            }
        },
        methods    : {
            onPay(){
                // createToken returns a Promise which resolves in a result object with
                // either a token or an error key.
                // See https://stripe.com/docs/api#tokens for the token object.
                // See https://stripe.com/docs/api#errors for the error object.
                // More general https://stripe.com/docs/stripe.js#stripe-create-token.

                createToken().then(data => {
                    this.$emit("create-token", data);
                });
            },
            onChange($event){
                this.isAllFieldsFilled = $event.complete;
                this.$emit("change", $event);
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.payment {
		&__card {
			padding : 11px 0 9px 4px;
			
			@include phone-big {
				padding : 18px 10px 16px;
			}
			
			&.is-success {
				border-color : green;
			}
		}
		
		&__submit-btn {
			color            : white;
			border           : none;
			padding          : $main_offset / 2 $main_offset;
			margin-top       : $main_offset / 2;
			transition       : $transition;
			border-radius    : 10px;
			background-color : transparentize($color-user-is-active, .25);
			
			&--is-disabled {
				cursor           : not-allowed;
				pointer-events   : none;
				background-color : $color-rolling-stone;
			}
			
			&:hover { background-color : $color-user-is-active; }
		}
	}
</style>

<style lang = "scss">
	// Overwrite Stripe default styles
	.ElementsApp, .ElementsApp .InputElement {
		font-size : 18px;
	}
</style>