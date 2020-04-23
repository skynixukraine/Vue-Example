<template>
	<div class = "page">
		<div class = "section" :class = "{'section--is-editing-message': editingData}" v-if = "!success">
			<div class = "container">
				<transition name = "main-animation">
					<div class = "payment-details">
						<h3>{{ `Services ${this.targetDoctor.title ? this.targetDoctor.title.name : ""}
							${this.targetDoctor.first_name} ${this.targetDoctor.last_name} cost
							${this.targetDoctor.enquire_price}` }}</h3>
						<select v-model = "userInputData.paymentMethods" class = "select payment">
							<option v-for = "option in $store.state.diagnosticChat.paymentMethods"
									v-bind:value = "option.name"
									v-bind:key = "option.name">
								{{ option.title }}
							</option>
						</select>
						
						<button class = "submit-btn"
								type = "button"
								v-if = "userInputData.paymentMethods != userInputData.defaultMethod"
								@click.stop = "onConfirmModal">Next
						</button>
						
						<StripePaymentSystem v-if = "userInputData.paymentMethods == userInputData.defaultMethod"
											 @create-token = "onCreateToken" />
					</div>
				</transition>
			</div>
			<transition name = "modal">
				<div class = "select-body-part-modal" v-if = "isShowSelectBodyPartModal">
					<div class = "select-body-part-modal__main">
						<BodyParts :isClickable = true
								   :showedHalfPart = showedBodyHalf
								   @select-body-part = "onSelectBodyPart"
								   :selectedParts = "editingData ? editingData.notConfirmedSelectedBodyParts : notConfirmedSelectedBodyParts" />
					</div>
					<footer class = "select-body-part-modal__footer">
						<button class = "control-btn--submit" @click.stop = "onConfirmBodySelectParts">Bestätigen
						</button>
						<button class = "control-btn--cancel" @click.stop = "onCancelBodySelectParts">Abbrechen</button>
					</footer>
				</div>
			</transition>
		</div>
		<div class = "section" :class = "{'section--is-editing-message': editingData}" v-else>
			<div class = "container">
				<transition name = "main-animation">
					<h3>Vielen Dank für Ihre Zahlung</h3>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
    import modal from "~/mixins/modal";
    import validator from "~/mixins/validator";
    import diagnosticChatApi from "~/services/api/DiagnosticChat";
    import Stripe from "~/services/api/Stripe";
    import StripePaymentSystem from "~/components/Content/StripePaymentSystem";
    import select2 from "~/components/select2/select2.vue";

    export default {
        head(){
            return {title : this.$t("page-forschung.head.title")}
        },
        async fetch({app, store, route, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null){
                await store.dispatch("user/LOAD_USER", {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error =>{
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                });
            }

            if(route.query.doctorId){
                await store.dispatch("diagnosticChat/LOAD_AND_SAVE_DOCTOR_FOR_DIAGNOSTIC_CHAT", {id : route.query.doctorId});
                await store.dispatch('diagnosticChat/LOAD_AND_SAVE_PAYMENT_METHODS', {});
            }
        },
        mixins     : [
            validator,
            modal
        ],
        components : {
            StripePaymentSystem,
            select2,
        },
        data(){
            return {
                scrollOffsetForForbidScroll : 0,
                editingData                 : null,
                // Data for 'body select' question type
                showedBodyHalf              : "",
                selectedBodyParts           : [],
                isShowSelectBodyPartModal   : false,
                doctorId                    : null,
                success                     : true,
                stripeToken                 : null,
                enquireId                   : null,
                userInputData               : {
                    defaultMethod  : 'credit_card',
                    paymentMethods : 'credit_card'
                }
            }
        },
        computed   : {
            footer(){
                return document.querySelector("main + footer");
            },
            targetDoctor(){
                return this.$store.state.diagnosticChat.targetDoctorForDiagnosticChat;
            }
        },
        mounted(){
            this.stripeToken                  = this.$route.query.source;
            this.userInputData.paymentMethods = this.$route.query.type;
            this.enquireId                    = this.$route.query.enquireId;
            this.onSubmitDiagnosticChatChargeEnquire();
            this.$router.replace(this.$routes.auschecken.path);

            this.$root.$on("submitDiagnosticChatConfirmEnquire", this.onSubmitDiagnosticChatChargeEnquire);
        },
        methods    : {
            onCreateToken(eventData){
                this.stripeToken = eventData.token.id;
                this.onConfirmModal();
            },
            onConfirmModal(){
                this.openModal(this.$modals.diagnosticChatConfirmEnquire);
            },
            onSubmitDiagnosticChatChargeEnquire(){

                if(this.userInputData.paymentMethods != this.userInputData.defaultMethod && this.stripeToken === null){
                    this.stripeCreateSource();
                }

                if(this.stripeToken){
                    let data = new FormData();
                    data.append("_method", "PATCH");
                    data.append("code", this.stripeToken);
                    data.append("type", this.userInputData.paymentMethods);

                    diagnosticChatApi.chargeEnquire(this.enquireId, data).then((response) =>{
                        if(this.targetDoctor){
                            this.openModal(this.$modals.chatModal, `${this.targetDoctor.title ? this.targetDoctor.title.name : ""} ${this.targetDoctor.first_name} ${this.targetDoctor.last_name} wird Sie per E-Mail kontaktieren.`,
                                "Ihre Anfrage wurde erstellt", "/faq");
                            this.success = true;
                        }
                    }).catch((error) =>{
                        this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                        this.success = false;
                    });

                    this.stripeToken = null;
                }

            },
            stripeCreateSource(){
                this.$store.dispatch('stripe/LOAD_AND_SAVE_STRIPE_SOURCE', {
                    type     : this.userInputData.paymentMethods,
                    amount   : this.targetDoctor.price,
                    currency : this.targetDoctor.currency,
                    redirect : {
                        return_url : `${process.env.BASE_APP_URL}/auschecken?type=` + this.userInputData.paymentMethods +
                        '&enquireId=' + this.enquireId +
                        '&doctorId=' + this.targetDoctor.id,
                    },
                    sofort   : {
                        country : 'DE',
                    },
                    owner    : {
                        name : this.targetDoctor.title.name
                    }
                }).then(function(result){
                    location.replace(result.source.redirect.url)
                }).catch((error) =>{
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });

            },
        },
        beforeDestroy(){
            this.closeModal(this.$modals.defaultModal);
            this.$root.$off("submitDiagnosticChatConfirmEnquire", this.onSubmitDiagnosticChatChargeEnquire);
        }
    }
</script>

<style lang = "scss" scoped>
	$max_width : 400px;
	$border-radius : 20px;
	$animation_duration : .75s;
	
	@mixin main-animation {
		opacity   : 0;
		transform : translateY(50px);
	}
	@mixin edit-animation {
		opacity   : 0;
		z-index   : -1;
		transform : translateY(-100%);
	}
	@mixin delete-animation {
		width      : 0;
		height     : 0;
		transform  : scale(0);
		font-size  : 0;
		transition : $animation_duration;
	}
	@mixin btn--is-disable {
		&.is-disable {
			cursor           : not-allowed;
			pointer-events   : none;
			background-color : $color-rolling-stone;
		}
	}
	@mixin container-for-input-text {
		&.is-for-input-text {
			width     : 100%;
			max-width : 100%;
		}
	}
	.section {
		background-color : $color-mercury;
		
		&:before {
			transition       : $transition;
			background-color : rgba(0, 0, 0, 0);
		}
		
		&--is-editing-message {
			position : relative;
			
			&:before {
				left             : 0;
				right            : 0;
				width            : 100%;
				height           : 100%;
				content          : "";
				z-index          : 1;
				position         : absolute;
				background-color : rgba(0, 0, 0, .75);
			}
			
			.message {
				&--is-editing {
					z-index  : 2;
					position : relative;
				}
			}
		}
	}
	.submit-btn {
		color            : white;
		border           : none;
		padding          : $main_offset / 2 $main_offset;
		margin-top       : $main_offset / 2;
		transition       : $transition;
		border-radius    : $border-radius / 2;
		background-color : transparentize($color-user-is-active, .25);
		
		&:hover { background-color : $color-user-is-active; }
		
		&__wrapper {
			display         : flex;
			justify-content : flex-end;
		}
		
		@include btn--is-disable;
		
		&.is-upload-photo {
			padding-top : 6px;
			
			&:after {
				$size : 24px;
				width               : $size;
				height              : $size;
				margin              : 0 0 -.25em $main_offset / 2;
				content             : "";
				display             : inline-block;
				background-image    : url("~static/images/icons/upload-photo.svg");
				background-repeat   : no-repeat;
				background-position : center;
			}
		}
	}
	.chat-container, .answer-area {
		margin    : 0 auto;
		position  : relative;
		max-width : 600px;
	}
	.message {
		color         : white;
		display       : flex;
		margin-bottom : $main_offset * 3;
		
		&__container {
			padding          : $main_offset;
			position         : relative;
			max-width        : $max_width;
			transition       : $animation_duration;
			border-radius    : 0 $border-radius $border-radius $border-radius;
			background-color : $color-stratos;
			
			&--hide { @include edit-animation; }
		}
		
		&__questioner {
			$fz : .75em;
			top       : $fz * -2;
			left      : 0;
			color     : black;
			position  : absolute;
			font-size : $fz;
		}
		
		&__title { color : white; }
		
		&--is-editing, &--editing-question {
			z-index  : 1;
			position : relative;
		}
		
		&--is-delete {
			@include delete-animation;
		}
	}
	.message--is-me {
		justify-content : flex-end;
		
		.message {
			&__container {
				border-radius    : $border-radius 0 $border-radius $border-radius;
				background-color : $color-curious-blue;
			}
			
			&__questioner {
				left  : auto;
				right : 0;
			}
		}
		
		&.message--is-body {
			.message {
				&__container {
					border-radius    : $border-radius 0 $border-radius $border-radius;
					background-color : rgba(1, 1, 1, 0);
				}
			}
		}
	}
	.answer-area, .edit-answer-area {
		display         : flex;
		flex-grow       : 1;
		transition      : $animation_duration;
		justify-content : flex-end;
		
		&__wrapper {
			display         : flex;
			max-width       : $max_width;
			flex-direction  : column;
			justify-content : flex-end;
			@include container-for-input-text;
		}
		
		&__input-text {
			position      : relative;
			margin-bottom : $main_offset / 2;
			
			&__textarea {
				width       : 100%;
				resize      : none;
				padding     : $main_offset / 2;
				line-height : 1.5;
			}
			
			&__auto-height {
				@extend .answer-area__input-text__textarea;
				z-index  : -1;
				opacity  : 0;
				position : absolute;
			}
		}
		
		&__select-body-part {
			max-width   : 75%;
			margin-left : auto;
			
			&__parts {
				margin  : 0 #{$main_offset / -2};
				display : flex;
			}
		}
		
		&__upload-image {
			position : relative;
			
			&__user-image-container { cursor : pointer; }
			
			&__input {
				opacity  : 0;
				z-index  : -2;
				position : absolute;
			}
		}
		
		&.is-wait-loading {
			@include main-animation;
			cursor         : default;
			pointer-events : none;
		}
		
		.submit-btn { float : right; }
	}
	.edit-answer-area {
		position       : absolute;
		flex-wrap      : wrap;
		flex-direction : column;
		@include container-for-input-text;
		
		&__controls {
			margin          : $main_offset / 2 #{$main_offset / -2} 0;
			display         : flex;
			flex-direction  : row;
			justify-content : flex-end;
		}
		
		&__edit-btn {
			$transform : translateY(100%);
			color            : $color-torea-bay;
			right            : ($main_offset * -1);
			bottom           : 0;
			display          : flex;
			position         : absolute;
			font-size        : .75em;
			transform        : $transform;
			background-color : transparent;
			
			&:before {
				$size : 18px;
				width            : $size * 3 / 4;
				height           : $size * 3 / 4;
				display          : inline-block;
				content          : "";
				margin-right     : 6px;
				background-image : url("~static/images/icons/edit.svg");
			}
			
			&:hover {
				transform : $transform scale(1.15);
			}
		}
	}
	/deep/ .user-uploaded-img {
		width : 100%;
	}
	.personal-info, .payment-details {
		margin-top : $main_offset;
		
		@include tablet {
			width      : 75%;
			margin     : 0 auto;
			margin-top : $main_offset * 2;
		}
		
		@include desktop {
			width      : 50%;
			margin-top : $main_offset * 4;
		}
	}
	.personal-info {
		&__field {
			position      : relative;
			margin-bottom : $main_offset;
			
			&__title {
				margin-bottom : $main_offset / 4;
			}
		}
	}
	.select-body-part-modal {
		$header_height : 64px;
		top              : $header_height;
		right            : 0;
		width            : 100%;
		height           : calc(100vh - #{$header_height});
		z-index          : 5;
		display          : flex;
		padding          : $main_offset 0;
		position         : fixed;
		align-items      : center;
		flex-direction   : column;
		overflow         : hidden;
		background-color : $color-black-squeeze;
		
		&__main {
			$controls_btns_height : 40px;
			height  : calc(100% - #{$main_offset + $controls_btns_height * 2});
			display : flex;
		}
		
		&__footer { margin-top : $main_offset; }
		
		@include tablet-big {
			$header_height : 80px;
			top    : $header_height;
			height : calc(100vh - #{$header_height});
		}
	}
	.is-required {
		&:after {
			color       : $color-alert-red;
			content     : "*";
			display     : inline-block;
			margin-left : 6px;
		}
	}
	.error-message {
		$size : .75em;
		left      : 0;
		color     : $color-alert-red;
		bottom    : $size * -2;
		position  : absolute;
		font-size : $size;
	}
	// Vue transitions
	.main-animation-enter-active, .main-animation-leave-active {
		transition : $animation_duration;
	}
	.edit-animation-enter-active, .edit-animation-leave-active {
		transition : $animation_duration;
	}
	.edit-animation-enter, .edit-animation-leave-to {
		@include edit-animation;
	}
	// modal
	.modal-enter-active, .modal-leave-active {
		transition : $animation_duration;
	}
	.modal-enter, .modal-leave-to {
		opacity : 0;
	}
	.vue-tel-input#vue-tel-input {
		border : 1px solid $color-table-border;
	}
</style>
